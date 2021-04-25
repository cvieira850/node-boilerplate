import {
  AuthenticationModel,
  HashComparer,
  Encrypt,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  AccountModel
} from './db-authentication-protocols'
import { DbAuthentication } from './db-authentication'

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeHashCompare = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async comparer (value: string, hash: string): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new HashComparerStub()
}

const makeEncrypt = (): Encrypt => {
  class EncryptStub implements Encrypt {
    async encrypt (id: string): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }
  return new EncryptStub()
}

const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async update (id: string, token: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}

const makeFakeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  encryptStub: Encrypt
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashComparerStub = makeHashCompare()
  const encryptStub = makeEncrypt()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encryptStub,
    updateAccessTokenRepositoryStub
  )
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encryptStub,
    updateAccessTokenRepositoryStub
  }
}

describe('DbAuthentication', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut,loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub,'load')
    await sut.auth(makeFakeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut,loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub,'load').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut,loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub,'load').mockReturnValueOnce(null)
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut,hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub,'comparer')
    await sut.auth(makeFakeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut,hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub,'comparer').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut,hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub,'comparer').mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  test('Should call Encrypt with correct id', async () => {
    const { sut,encryptStub } = makeSut()
    const encryptSpy = jest.spyOn(encryptStub,'encrypt')
    await sut.auth(makeFakeAuthentication())
    expect(encryptSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if Encrypt throws', async () => {
    const { sut,encryptStub } = makeSut()
    jest.spyOn(encryptStub,'encrypt').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should call Encrypt returns a token on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBe('any_token')
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub,'update')
    await sut.auth(makeFakeAuthentication())
    expect(updateSpy).toHaveBeenCalledWith('any_id','any_token')
  })

  test('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut,updateAccessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub,'update').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })
})
