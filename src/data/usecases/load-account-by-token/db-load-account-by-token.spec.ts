import { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository'
import { AccountModel } from '../../../domain/models/account'
import { Decrypter } from '../../protocols/cryptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_user_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password',
  role_id: 'valid_role_id'
})

const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (value: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('any_value'))
    }
  }
  return new DecrypterStub()
}

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(
    decrypterStub,
    loadAccountByTokenRepositoryStub
  )
  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  describe('Decrypter',() => {
    test('Should call Decrypter with correct values' , async () => {
      const { sut, decrypterStub } = makeSut()
      const decryptSpy = jest.spyOn(decrypterStub,'decrypt')
      await sut.loadByToken('any_token','any_role')
      expect(decryptSpy).toHaveBeenCalledWith('any_token')
    })

    test('Should return null if Decrypter returns null' , async () => {
      const { sut, decrypterStub } = makeSut()
      jest.spyOn(decrypterStub,'decrypt').mockReturnValueOnce(new Promise(resolve => resolve(null)))
      const account = await sut.loadByToken('any_token','any_role')
      expect(account).toBeNull()
    })

    test('Should throw if Decrypter throws', async () => {
      const { sut, decrypterStub } = makeSut()
      jest.spyOn(decrypterStub,'decrypt').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
      const promise = sut.loadByToken('any_token','any_role')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('LoadAccountByTokenRepository', () => {
    test('Should call LoadAccountByTokenRepository with correct values' , async () => {
      const { sut, loadAccountByTokenRepositoryStub } = makeSut()
      const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub,'loadByToken')
      await sut.loadByToken('any_token','any_role')
      expect(loadByTokenSpy).toHaveBeenCalledWith('any_token','any_role')
    })

    test('Should return null if LoadAccountByTokenRepository returns null' , async () => {
      const { sut, loadAccountByTokenRepositoryStub } = makeSut()
      jest.spyOn(loadAccountByTokenRepositoryStub,'loadByToken').mockReturnValueOnce(new Promise(resolve => resolve(null)))
      const account = await sut.loadByToken('any_token','any_role')
      expect(account).toBeNull()
    })

    test('Should throw if LoadAccountByTokenRepository throws', async () => {
      const { sut, loadAccountByTokenRepositoryStub } = makeSut()
      jest.spyOn(loadAccountByTokenRepositoryStub,'loadByToken').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
      const promise = sut.loadByToken('any_token','any_role')
      await expect(promise).rejects.toThrow()
    })

    test('Should returns null if role id is null' , async () => {
      const { sut, loadAccountByTokenRepositoryStub } = makeSut()
      jest.spyOn(loadAccountByTokenRepositoryStub,'loadByToken').mockReturnValueOnce(
        new Promise(resolve => resolve(null)))
      const account = await sut.loadByToken('any_token','any_role')
      expect(account).toBeNull()
    })
  })

  test('Should return an account on success' , async () => {
    const { sut } = makeSut()
    const account = await sut.loadByToken('any_token')
    expect(account).toEqual(makeFakeAccount())
  })

  test('Should return an account on success' , async () => {
    const { sut } = makeSut()
    const account = await sut.loadByToken('any_token','valid_role_name')
    expect(account).toEqual(makeFakeAccount())
  })
})
