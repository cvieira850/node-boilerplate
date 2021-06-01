import { DbAddAccount } from './db-add-account'
import { AddAccountRepositorySpy, HashSpy, LoadAccountByEmailRepositorySpy } from '@/data/test'
import { mockAddAccountParams, mockAccountModel, throwError } from '@/domain/test'

type SutTypes = {
  sut: DbAddAccount
  hashSpy: HashSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const hashSpy = new HashSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  loadAccountByEmailRepositorySpy.accountModel = null
  const sut = new DbAddAccount(hashSpy, addAccountRepositorySpy,loadAccountByEmailRepositorySpy)
  return {
    sut,
    hashSpy,
    addAccountRepositorySpy,
    loadAccountByEmailRepositorySpy
  }
}

describe('DbAddAccount UseCase', () => {
  describe('Hash', () => {
    test('Should call Hash with correct password', async () => {
      const { sut,hashSpy } = makeSut()
      const addAccountParams = mockAddAccountParams()
      await sut.add(addAccountParams)
      expect(hashSpy.plaintext).toBe(addAccountParams.password)
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
      const addAccountParams = mockAddAccountParams()
      await sut.add(addAccountParams)
      expect(addSpy).toHaveBeenCalledWith({
        name: addAccountParams.name,
        email: addAccountParams.email,
        password: hashSpy.digest
      })
    })

    test('Should throw if AddAccountRepository throws', async () => {
      const { sut, addAccountRepositorySpy } = makeSut()
      jest.spyOn(addAccountRepositorySpy,'add').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddAccountParams())
      await expect(promise).rejects.toThrow()
    })

    test('Should return an account on success', async () => {
      const { sut, addAccountRepositorySpy } = makeSut()
      const account = await sut.add(mockAddAccountParams())
      expect(account).toEqual(addAccountRepositorySpy.accountModel)
    })
  })

  describe('Load Account By Email Repository', () => {
    test('Should return null if LoadAccountByEmailRepository not returns null', async () => {
      const { sut, loadAccountByEmailRepositorySpy } = makeSut()
      loadAccountByEmailRepositorySpy.accountModel = mockAccountModel()
      const account = await sut.add(mockAddAccountParams())
      expect(account).toBeNull()
    })

    test('Should call LoadAccountByEmailRepository with correct email', async () => {
      const { sut,loadAccountByEmailRepositorySpy } = makeSut()
      const addAccountParams = mockAddAccountParams()
      await sut.add(addAccountParams)
      console.log(loadAccountByEmailRepositorySpy)
      expect(loadAccountByEmailRepositorySpy.email).toBe(addAccountParams.email)
    })
  })
})
