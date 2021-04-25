import { DbAddAccount } from './db-add-account'
import { Hash, AccountModel, AddAccountModel, AddAccountRepository } from './db-add-account-protocols'

const makeHash = (): Hash => {
  class HashStub implements Hash {
    async hash (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new HashStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(MakeFakeAccount()))
    }
  }
  return new AddAccountRepositoryStub()
}

const MakeFakeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password'
})

const MakeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password'

})

interface SutTypes {
  sut: DbAddAccount
  hashStub: Hash
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const hashStub = makeHash()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(hashStub, addAccountRepositoryStub)
  return {
    sut,
    hashStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Hash with correct password', async () => {
    const { sut,hashStub } = makeSut()
    const hashSpy = jest.spyOn(hashStub, 'hash')
    await sut.add(MakeFakeAccountData())
    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })
  test('Should throw if Hash throws', async () => {
    const { sut, hashStub } = makeSut()
    jest.spyOn(hashStub,'hash').mockResolvedValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const promise = sut.add(MakeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut,addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(MakeFakeAccountData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })
  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub,'add').mockResolvedValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const promise = sut.add(MakeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })
  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(MakeFakeAccountData())
    expect(account).toEqual(MakeFakeAccount())
  })
})
