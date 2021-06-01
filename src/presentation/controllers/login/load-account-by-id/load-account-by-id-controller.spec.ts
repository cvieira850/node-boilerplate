import { LoadAccountByIdController } from './load-account-by-id-controller'
import { HttpRequest } from './load-account-by-id-protocols'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { throwError } from '@/domain/test'
import { LoadAccountByIdSpy } from '@/presentation/test'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({
  params: {
    userId: faker.datatype.uuid()
  }
})

type SutTypes = {
  sut: LoadAccountByIdController
  loadAccountByIdSpy: LoadAccountByIdSpy
}

const makeSut = (): SutTypes => {
  const loadAccountByIdSpy = new LoadAccountByIdSpy()
  const sut = new LoadAccountByIdController(loadAccountByIdSpy)
  return {
    sut,
    loadAccountByIdSpy
  }
}

describe('LoadAccountById Controller', () => {
  test('Should call LoadAccountById with correct id', async () => {
    const { sut,loadAccountByIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadAccountByIdSpy.id).toBe(httpRequest.params.userId)
  })

  test('Should return 403 if LoadAccountById returns null', async () => {
    const { sut,loadAccountByIdSpy } = makeSut()
    jest.spyOn(loadAccountByIdSpy,'loadById').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('userId')))
  })

  test('Should return 500 if LoadAccountById throws', async () => {
    const { sut, loadAccountByIdSpy } = makeSut()
    jest.spyOn(loadAccountByIdSpy,'loadById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if LoadAccountById succeeds', async () => {
    const { sut, loadAccountByIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadAccountByIdSpy.accountModel))
  })
})
