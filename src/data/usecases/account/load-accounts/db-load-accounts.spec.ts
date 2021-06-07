import { DbLoadAccounts } from './db-load-accounts'
import { throwError } from '@/domain/test'
import { LoadAccountsRepositorySpy } from '@/data/test'

type SutTypes = {
  sut: DbLoadAccounts
  loadAccountsRepositorySpy: LoadAccountsRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountsRepositorySpy = new LoadAccountsRepositorySpy()
  const sut = new DbLoadAccounts(
    loadAccountsRepositorySpy
  )
  return {
    sut,
    loadAccountsRepositorySpy
  }
}
describe('DbLoadAccountById UseCase', () => {
  test('Should throw if LoadAccountRepository throws', async () => {
    const { sut, loadAccountsRepositorySpy } = makeSut()
    jest.spyOn(loadAccountsRepositorySpy,'load').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })

  test('Should return accounts on success' , async () => {
    const { sut, loadAccountsRepositorySpy } = makeSut()
    const accounts = await sut.load()
    expect(accounts[0]).toEqual(loadAccountsRepositorySpy.result[0])
  })
})
