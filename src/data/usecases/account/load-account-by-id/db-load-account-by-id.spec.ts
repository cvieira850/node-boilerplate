import { DbLoadAccountById } from './db-load-account-by-id'
import { LoadAccountByIdRepository } from './db-load-account-by-id-protocols'
import { throwError, mockAccountModel } from '@/domain/test'
import { mockLoadAccountByIdRepository } from '@/data/test'

type SutTypes = {
  sut: DbLoadAccountById
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositoryStub = mockLoadAccountByIdRepository()
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
    jest.spyOn(loadAccountByIdRepositoryStub,'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById('valid_user_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success' , async () => {
    const { sut } = makeSut()
    const account = await sut.loadById('valid_user_id')
    expect(account).toEqual(mockAccountModel())
  })
})
