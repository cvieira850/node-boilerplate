import { AddRoleToUserController } from './add-role-to-user-controller'
import { Validation, AddRoleToUser, HttpRequest } from './add-role-to-user-protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidRoleOrUserError } from '@/presentation/errors'
import { throwError, mockAccountModel } from '@/domain/test'
import { mockAddRoleToUser } from '@/presentation/test'
import { mockValidation } from '@/validation/test/mock-validation'

const mockRequest = (): HttpRequest => ({
  body: {
    userId: 'valid_user_id',
    roleId: 'valid_role_id'
  }
})

type SutTypes = {
  sut: AddRoleToUserController
  validationStub: Validation
  addRoleToUserStub: AddRoleToUser
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addRoleToUserStub = mockAddRoleToUser()
  const sut = new AddRoleToUserController(validationStub,addRoleToUserStub)
  return {
    sut,
    validationStub,
    addRoleToUserStub
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
    const { sut, addRoleToUserStub } = makeSut()
    const addSpy = jest.spyOn(addRoleToUserStub,'addRoleToUser')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 403 if AddRoleToUser returns null', async () => {
    const { sut, addRoleToUserStub } = makeSut()
    jest.spyOn(addRoleToUserStub,'addRoleToUser').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidRoleOrUserError()))
  })

  test('Should return 500 if AddRoleToUser throws', async () => {
    const { sut, addRoleToUserStub } = makeSut()
    jest.spyOn(addRoleToUserStub,'addRoleToUser').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if AddRoleToUser succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockAccountModel()))
  })
})
