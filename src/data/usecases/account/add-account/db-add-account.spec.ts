import { DbAddAccount } from './db-add-account'
import { LoadAccountByEmailRepository } from './db-add-account-protocols'
import { AddAccountRepositorySpy, HashSpy, mockLoadAccountByEmailRepository } from '@/data/test'
import { mockAddAccountParams, mockAccountModel, throwError } from '@/domain/test'

type SutTypes = {
  sut: DbAddAccount
  hashSpy: HashSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const hashSpy = new HashSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  jest.spyOn(loadAccountByEmailRepositoryStub,'loadByEmail').mockReturnValue(Promise.resolve(null))
  const sut = new DbAddAccount(hashSpy, addAccountRepositorySpy,loadAccountByEmailRepositoryStub)
  return {
    sut,
    hashSpy,
    addAccountRepositorySpy,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount UseCase', () => {
  describe('Hash', () => {
    test('Should call Hash with correct password', async () => {
      const { sut,hashSpy } = makeSut()
      await sut.add(mockAddAccountParams())
      expect(hashSpy.plaintext).toBe('any_password')
    })
    test('Should throw if Hash throws', async () => {
      const { sut, hashSpy } = makeSut()
      jest.spyOn(hashSpy,'hash').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddAccountParams())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('Add Account Repository', () => {
    test('Should call AddAccountRepository with correct values', async () => {
      const { sut,addAccountRepositorySpy, hashSpy } = makeSut()
      const addSpy = jest.spyOn(addAccountRepositorySpy, 'add')
      await sut.add(mockAddAccountParams())
      expect(addSpy).toHaveBeenCalledWith({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: hashSpy.digest
      })
    })

    test('Should throw if AddAccountRepository throws', async () => {
      const { sut, addAccountRepositorySpy } = makeSut()
      jest.spyOn(addAccountRepositorySpy,'add').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddAccountParams())
      await expect(promise).rejects.toThrow()
    })
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(mockAddAccountParams())
    expect(account).toEqual(mockAccountModel())
  })

  test('Should return null if LoadAccountByEmailRepository not returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub,'loadByEmail').mockReturnValueOnce(Promise.resolve(mockAccountModel()))
    const account = await sut.add(mockAddAccountParams())
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut,loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub,'loadByEmail')
    await sut.add(mockAddAccountParams())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
