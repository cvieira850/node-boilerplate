import { AddRoleToUserController } from './add-role-to-user-controller'
import { HttpRequest } from './add-role-to-user-protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidRoleOrUserError } from '@/presentation/errors'
import { throwError } from '@/domain/test'
import { AddRoleToUserSpy , ValidationSpy } from '@/presentation/test'

import faker from 'faker'

const mockRequest = (): HttpRequest => ({
  body: {
    userId: faker.datatype.uuid(),
    roleId: faker.datatype.uuid()
  }
})

type SutTypes = {
  sut: AddRoleToUserController
  validationSpy: ValidationSpy
  addRoleToUserSpy: AddRoleToUserSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addRoleToUserSpy = new AddRoleToUserSpy()
  const sut = new AddRoleToUserController(validationSpy,addRoleToUserSpy)
  return {
    sut,
    validationSpy,
    addRoleToUserSpy
  }
}

describe('AddRoleToUserController', () => {
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

  test('Should call AddRoleToUser with correct values', async () => {
    const { sut, addRoleToUserSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addRoleToUserSpy.data).toEqual(httpRequest.body)
  })

  test('Should return 403 if AddRoleToUser returns null', async () => {
    const { sut, addRoleToUserSpy } = makeSut()
    addRoleToUserSpy.accountModel = null
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
