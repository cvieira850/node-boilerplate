import { AddRoleController } from './add-role-controller'
import { HttpRequest } from './add-role-controller-protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { RoleIsAlreadyRegisteredError } from '@/presentation/errors'
import { AddRoleSpy, ValidationSpy } from '@/presentation/test'
import { throwError } from '@/domain/test'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({
  body: {
    name: faker.name.findName()
  }
})

type SutTypes = {
  validationSpy: ValidationSpy
  sut: AddRoleController
  addRoleSpy: AddRoleSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addRoleSpy = new AddRoleSpy()
  const sut = new AddRoleController(validationSpy,addRoleSpy)
  return {
    sut,
    validationSpy,
    addRoleSpy
  }
}

describe('AddRoleController', () => {
  test('Should call validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toBe(httpRequest.body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy,'validate').mockReturnValueOnce(new Error())
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
    const { sut, addRoleSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(addRoleSpy.roleModel))
  })
})
