import { HttpRequest } from './update-account-protocols'
import { UpdateAccountController } from './update-account-controller'
import { UpdateAccountSpy, ValidationSpy } from '@/presentation/test'
import { EmailInUseError, MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { throwError } from '@/domain/test'
import faker from 'faker'

const mockRequest = (): HttpRequest => (
  {
    body: {
      name: faker.name.findName(),
      email: faker.internet.email()
    }
  }
)

type SutTypes = {
  sut: UpdateAccountController
  validationSpy: ValidationSpy
  updateAccountSpy: UpdateAccountSpy
}
const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const updateAccountSpy = new UpdateAccountSpy()
  const sut = new UpdateAccountController(validationSpy, updateAccountSpy)
  return {
    sut,
    validationSpy,
    updateAccountSpy
  }
}

describe('UpdateAccount Controller', () => {
  describe('Validation', () => {
    test('Should call validation with correct values', async () => {
      const { sut, validationSpy } = makeSut()
      const httpRequest = mockRequest()
      await sut.handle(httpRequest)
      expect(validationSpy.input).toBe(httpRequest.body)
    })

    test('Should return 400 if validation returns an error', async () => {
      const { sut, validationSpy } = makeSut()
      const field = faker.random.word()
      jest.spyOn(validationSpy,'validate').mockReturnValueOnce(new MissingParamError(field))
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(badRequest(new MissingParamError(field)))
    })
  })
  describe('Update Account', () => {
    test('Should call UpdateAccount with correct values', async () => {
      const { sut, updateAccountSpy } = makeSut()
      const httpRequest = mockRequest()
      await sut.handle(httpRequest)
      expect(updateAccountSpy.accountData).toEqual({
        name: httpRequest.body.name,
        email: httpRequest.body.email
      })
    })

    test('Should return 500 if UpdateAccount throws ', async () => {
      const { sut,updateAccountSpy } = makeSut()
      jest.spyOn(updateAccountSpy,'update').mockImplementationOnce(throwError)
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(serverError(new ServerError(null)))
    })

    test('Should return 403 if UpdateAccount returns null', async () => {
      const { sut, updateAccountSpy } = makeSut()
      updateAccountSpy.accountModel = null
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
    })
  })
})
