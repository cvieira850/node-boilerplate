import { Validation } from './add-role-to-user-protocols'
import { AddRoleToUserController } from './add-role-to-user-controller'

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
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new AddRoleToUserController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('AddRoleToUserController', () => {
  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub,'validate')
    const httpRequest = {
      body: {
        userId: 'any_user_id',
        roleId: 'any_role_id'
      }
    }
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
