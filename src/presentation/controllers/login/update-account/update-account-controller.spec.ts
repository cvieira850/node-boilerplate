import { HttpRequest } from './update-account-protocols'
import { UpdateAccountController } from './update-account-controller'
import { LoadAccountByIdSpy, UpdateAccountSpy, ValidationSpy } from '@/presentation/test'
import { EmailInUseError, InvalidParamError, MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { throwError } from '@/domain/test'
import faker from 'faker'

const mockRequest = (): HttpRequest => (
  {
    params: {
      userId: faker.datatype.uuid()
    },
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
  loadAccountByIdSpy: LoadAccountByIdSpy
}
const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const updateAccountSpy = new UpdateAccountSpy()
  const loadAccountByIdSpy = new LoadAccountByIdSpy()
  const sut = new UpdateAccountController(validationSpy, updateAccountSpy, loadAccountByIdSpy)
  return {
    sut,
    validationSpy,
    updateAccountSpy,
    loadAccountByIdSpy
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
  describe('Load Account by id', () => {
    test('Should call LoadAccountById with correct id', async () => {
      const { sut,loadAccountByIdSpy } = makeSut()
      const httpRequest = mockRequest()
      await sut.handle(httpRequest)
      expect(loadAccountByIdSpy.id).toBe(httpRequest.params.userId)
    })
    test('Should return 403 if LoadAccountById returns null', async () => {
      const { sut,loadAccountByIdSpy } = makeSut()
      loadAccountByIdSpy.accountModel = null
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(forbidden(new InvalidParamError('userId')))
    })

    test('Should return 500 if LoadAccountById throws', async () => {
      const { sut, loadAccountByIdSpy } = makeSut()
      jest.spyOn(loadAccountByIdSpy,'loadById').mockImplementationOnce(throwError)
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
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

    test('Should return 200 if UpdateAccount succeeds', async () => {
      const { sut, updateAccountSpy } = makeSut()
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(ok(updateAccountSpy.accountModel))
    })
  })
})
