import { DbLoadAccountById } from './db-load-account-by-id'
import { LoadAccountByIdRepository } from '@/data/protocols/db/account/load-account-by-id-repository'
import { AccountModel } from '@/domain/models/account'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_user_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password',
  role_id: 'valid_role_id'
})

const makeLoadAccountByIdRepository = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    async loadById (userId: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByIdRepositoryStub()
}

type SutTypes = {
  sut: DbLoadAccountById
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositoryStub = makeLoadAccountByIdRepository()
  const sut = new DbLoadAccountById(
    loadAccountByIdRepositoryStub
  )
  return {
    sut,
    loadAccountByIdRepositoryStub
  }
}

describe('DbLoadAccountById Usecase', () => {
  test('Should call LoadAccountByIdRepository with correct id' , async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadAccountByIdRepositoryStub,'loadById')
    await sut.loadById('valid_user_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('valid_user_id')
  })

  test('Should throw if LoadAccountByIdRepository throws', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByIdRepositoryStub,'loadById').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const promise = sut.loadById('valid_user_id')
    await expect(promise).rejects.toThrow()
  })
})
