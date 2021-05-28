import { LoadAccountByIdController } from './load-account-by-id-controller'
import { HttpRequest, LoadAccountById } from './load-account-by-id-protocols'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { throwError, mockAccountModel } from '@/domain/test'
import { mockLoadAccountById } from '@/presentation/test/mock-load-account-by-id'

const mockRequest = (): HttpRequest => ({
  params: {
    userId: 'valid_user_id'
  }
})

type SutTypes = {
  sut: LoadAccountByIdController
  loadAccountByIdStub: LoadAccountById
}

const makeSut = (): SutTypes => {
  const loadAccountByIdStub = mockLoadAccountById()
  const sut = new LoadAccountByIdController(loadAccountByIdStub)
  return {
    sut,
    loadAccountByIdStub
  }
}

describe('LoadAccountById Controller', () => {
  test('Should call LoadAccountById with correct id', async () => {
    const { sut,loadAccountByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadAccountByIdStub,'loadById')
    await sut.handle(mockRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('valid_user_id')
  })

  test('Should return 403 if LoadAccountById returns null', async () => {
    const { sut,loadAccountByIdStub } = makeSut()
    jest.spyOn(loadAccountByIdStub,'loadById').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('userId')))
  })

  test('Should return 500 if LoadAccountById throws', async () => {
    const { sut, loadAccountByIdStub } = makeSut()
    jest.spyOn(loadAccountByIdStub,'loadById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if LoadAccountById succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockAccountModel()))
  })
})
