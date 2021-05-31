import { DbLoadAccountById } from './db-load-account-by-id'
import { throwError } from '@/domain/test'
import { LoadAccountByIdRepositorySpy } from '@/data/test'

type SutTypes = {
  sut: DbLoadAccountById
  loadAccountByIdRepositorySpy: LoadAccountByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositorySpy = new LoadAccountByIdRepositorySpy()
  const sut = new DbLoadAccountById(
    loadAccountByIdRepositorySpy
  )
  return {
    sut,
    loadAccountByIdRepositorySpy
  }
}

describe('DbLoadAccountById Usecase', () => {
  test('Should call LoadAccountByIdRepository with correct id' , async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    await sut.loadById('any_id')
    expect(loadAccountByIdRepositorySpy.userId).toBe('any_id')
  })

  test('Should throw if LoadAccountByIdRepository throws', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByIdRepositorySpy,'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success' , async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    const account = await sut.loadById('any_id')
    expect(account).toEqual(loadAccountByIdRepositorySpy.accountModel)
  })
})
