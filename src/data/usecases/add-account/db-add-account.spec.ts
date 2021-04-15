import { DbAddAccount } from './db-add-account'
import { Encrypter, AccountModel, AddAccountModel, AddAccountRepository } from './db-add-account-protocols'

const makeEncripter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
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
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncripter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut,encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.add(MakeFakeAccountData())
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub,'encrypt').mockResolvedValueOnce(new Promise((resolve,reject) => reject(new Error())))
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
