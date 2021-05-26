import { LoadAccountByIdController } from './load-account-by-id-controller'
import { HttpRequest, LoadAccountById, AccountModel } from './load-account-by-id-protocols'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helpers/http/http-helper'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    userId: 'valid_user_id'
  }
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_user_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password',
  role_id: 'valid_role_id'
})

const makeLoadAccountById = (): LoadAccountById => {
  class LoadAccountByIdStub implements LoadAccountById {
    async loadById (id: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByIdStub()
}

type SutTypes = {
  sut: LoadAccountByIdController
  loadAccountByIdStub: LoadAccountById
}

const makeSut = (): SutTypes => {
  const loadAccountByIdStub = makeLoadAccountById()
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
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('valid_user_id')
  })

  test('Should return 403 if LoadAccountById returns null', async () => {
    const { sut,loadAccountByIdStub } = makeSut()
    jest.spyOn(loadAccountByIdStub,'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('userId')))
  })
})
