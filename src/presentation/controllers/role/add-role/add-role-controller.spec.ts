import { HttpRequest, Validation, RoleModel, AddRole, AddRoleModel } from './add-role-controller-protocols'
import { AddRoleController } from './add-role-controller'
import { badRequest } from '../../../helpers/http/http-helper'

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
    async add (data: AddRoleModel): Promise<RoleModel> {
      return new Promise(resolve => resolve(makeFakeRole()))
    }
  }
  return new AddRoleStub()
}

interface SutTypes {
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
})
