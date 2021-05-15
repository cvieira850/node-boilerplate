import { HttpRequest, Validation } from './add-role-controller-protocols'
import { AddRoleController } from './add-role-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name'
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  validationStub: Validation
  sut: AddRoleController
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new AddRoleController(validationStub)
  return {
    sut,
    validationStub
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
})
