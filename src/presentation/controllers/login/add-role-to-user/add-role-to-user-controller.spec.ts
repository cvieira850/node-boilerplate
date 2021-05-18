import { Validation, AccountModel, AddRoleToUser, AddRoleToUserModel, HttpRequest } from './add-role-to-user-protocols'
import { AddRoleToUserController } from './add-role-to-user-controller'
import { badRequest, forbidden } from '../../../helpers/http/http-helper'
import { InvalidRoleOrUserError } from '../../../errors'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_user_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password',
  role_id: 'valid_role_id'
})

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    userId: 'valid_user_id',
    roleId: 'valid_role_id'
  }
})

const makeAddRoleToUser = (): AddRoleToUser => {
  class AddRoleToUserStub implements AddRoleToUser {
    async addRoleToUser (data: AddRoleToUserModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new AddRoleToUserStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: AddRoleToUserController
  validationStub: Validation
  addRoleToUserStub: AddRoleToUser
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addRoleToUserStub = makeAddRoleToUser()
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
    const httpRequest = makeFakeHttpRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub,'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddRoleToUser with correct values', async () => {
    const { sut, addRoleToUserStub } = makeSut()
    const addSpy = jest.spyOn(addRoleToUserStub,'addRoleToUser')
    const httpRequest = makeFakeHttpRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 403 if AddRoleToUser returns null', async () => {
    const { sut, addRoleToUserStub } = makeSut()
    jest.spyOn(addRoleToUserStub,'addRoleToUser').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidRoleOrUserError()))
  })
})
