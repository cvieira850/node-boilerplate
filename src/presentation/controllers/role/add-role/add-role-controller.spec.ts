import { AddRoleController } from './add-role-controller'
import { HttpRequest, Validation, RoleModel, AddRole, AddRoleParams } from './add-role-controller-protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { RoleIsAlreadyRegisteredError } from '@/presentation/errors'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name'
  }
})

const makeFakeRole = (): RoleModel => ({
  id: 'any_id',
  name: 'any_name'
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddRole = (): AddRole => {
  class AddRoleStub implements AddRole {
    async add (data: AddRoleParams): Promise<RoleModel> {
      return new Promise(resolve => resolve(makeFakeRole()))
    }
  }
  return new AddRoleStub()
}

type SutTypes = {
  validationStub: Validation
  sut: AddRoleController
  addRoleStub: AddRole
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addRoleStub = makeAddRole()
  const sut = new AddRoleController(validationStub,addRoleStub)
  return {
    sut,
    validationStub,
    addRoleStub
  }
}

describe('AddRoleController', () => {
  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub,'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub,'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddRole with correct values', async () => {
    const { sut, addRoleStub } = makeSut()
    const addSpy = jest.spyOn(addRoleStub,'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 403 if AddRole returns null', async () => {
    const { sut, addRoleStub } = makeSut()
    jest.spyOn(addRoleStub,'add').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new RoleIsAlreadyRegisteredError()))
  })

  test('Should return 500 if AddRole throws', async () => {
    const { sut, addRoleStub } = makeSut()
    jest.spyOn(addRoleStub,'add').mockResolvedValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeRole()))
  })
})
