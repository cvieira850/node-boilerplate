import { AddRoleToUserController } from './add-role-to-user-controller'
import { Validation, HttpRequest } from './add-role-to-user-protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidRoleOrUserError } from '@/presentation/errors'
import { throwError } from '@/domain/test'
import { AddRoleToUserSpy } from '@/presentation/test'
import { mockValidation } from '@/validation/test/mock-validation'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({
  body: {
    userId: faker.datatype.uuid(),
    roleId: faker.datatype.uuid()
  }
})

type SutTypes = {
  sut: AddRoleToUserController
  validationStub: Validation
  addRoleToUserSpy: AddRoleToUserSpy
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addRoleToUserSpy = new AddRoleToUserSpy()
  const sut = new AddRoleToUserController(validationStub,addRoleToUserSpy)
  return {
    sut,
    validationStub,
    addRoleToUserSpy
  }
}

describe('AddRoleToUserController', () => {
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

  test('Should call AddRoleToUser with correct values', async () => {
    const { sut, addRoleToUserSpy } = makeSut()
    const addSpy = jest.spyOn(addRoleToUserSpy,'addRoleToUser')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 403 if AddRoleToUser returns null', async () => {
    const { sut, addRoleToUserSpy } = makeSut()
    jest.spyOn(addRoleToUserSpy,'addRoleToUser').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidRoleOrUserError()))
  })

  test('Should return 500 if AddRoleToUser throws', async () => {
    const { sut, addRoleToUserSpy } = makeSut()
    jest.spyOn(addRoleToUserSpy,'addRoleToUser').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if AddRoleToUser succeeds', async () => {
    const { sut, addRoleToUserSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(addRoleToUserSpy.accountModel))
  })
})
