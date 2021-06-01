import { AddRoleController } from './add-role-controller'
import { HttpRequest, Validation } from './add-role-controller-protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { RoleIsAlreadyRegisteredError } from '@/presentation/errors'
import { mockRoleModel, throwError } from '@/domain/test'
import { mockValidation } from '@/validation/test/mock-validation'
import { AddRoleSpy } from '@/presentation/test'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({
  body: {
    name: faker.name.findName()
  }
})

type SutTypes = {
  validationStub: Validation
  sut: AddRoleController
  addRoleSpy: AddRoleSpy
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addRoleSpy = new AddRoleSpy()
  const sut = new AddRoleController(validationStub,addRoleSpy)
  return {
    sut,
    validationStub,
    addRoleSpy
  }
}

describe('AddRoleController', () => {
  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub,'validate')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub,'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddRole with correct values', async () => {
    const { sut, addRoleSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addRoleSpy.data).toEqual(httpRequest.body)
  })

  test('Should return 403 if AddRole returns null', async () => {
    const { sut, addRoleSpy } = makeSut()
    addRoleSpy.roleModel = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new RoleIsAlreadyRegisteredError()))
  })

  test('Should return 500 if AddRole throws', async () => {
    const { sut, addRoleSpy } = makeSut()
    jest.spyOn(addRoleSpy,'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockRoleModel()))
  })
})
