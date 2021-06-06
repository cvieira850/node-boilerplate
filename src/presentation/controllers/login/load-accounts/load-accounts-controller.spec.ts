import { LoadAccountsController } from './load-accounts-controller'
import { HttpRequest } from './load-accounts-protocols'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadAccountsSpy } from '@/presentation/test/mock-load-accounts'
import { throwError } from '@/domain/test'

const mockRequest = (): HttpRequest => ({
  body: {}
})

type SutTypes = {
  sut: LoadAccountsController
  loadAccountsSpy: LoadAccountsSpy
}

const makeSut = (): SutTypes => {
  const loadAccountsSpy = new LoadAccountsSpy()
  const sut = new LoadAccountsController(loadAccountsSpy)
  return {
    sut,
    loadAccountsSpy
  }
}

describe('LoadAccounts Controller ', () => {
  test('Should return 500 if LoadAccounts throws', async () => {
    const { sut, loadAccountsSpy } = makeSut()
    jest.spyOn(loadAccountsSpy,'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 200 on success', async () => {
    const { sut, loadAccountsSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadAccountsSpy.accountsModel))
  })
})
