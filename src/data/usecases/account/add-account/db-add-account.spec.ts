import { DbAddAccount } from './db-add-account'
import { AddAccountRepository,LoadAccountByEmailRepository } from './db-add-account-protocols'
import { mockAddAccountRepository, HashSpy, mockLoadAccountByEmailRepository } from '@/data/test'
import { mockAddAccountParams, mockAccountModel, throwError } from '@/domain/test'

type SutTypes = {
  sut: DbAddAccount
  hashStub: HashSpy
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const hashStub = new HashSpy()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  jest.spyOn(loadAccountByEmailRepositoryStub,'loadByEmail').mockReturnValue(Promise.resolve(null))
  const sut = new DbAddAccount(hashStub, addAccountRepositoryStub,loadAccountByEmailRepositoryStub)
  return {
    sut,
    hashStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount UseCase', () => {
  test('Should call Hash with correct password', async () => {
    const { sut,hashStub } = makeSut()
    const hashSpy = jest.spyOn(hashStub, 'hash')
    await sut.add(mockAddAccountParams())
    expect(hashSpy).toHaveBeenCalledWith('any_password')
  })
  test('Should throw if Hash throws', async () => {
    const { sut, hashStub } = makeSut()
    jest.spyOn(hashStub,'hash').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut,addAccountRepositoryStub, hashStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(mockAddAccountParams())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: hashStub.digest
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub,'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
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
