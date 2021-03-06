import { DbAuthentication } from './db-authentication'
import { mockAuthentication, throwError } from '@/domain/test'
import {
  EncryptSpy,
  HashComparerSpy,
  LoadAccountByEmailRepositorySpy,
  UpdateAccessTokenRepositorySpy
} from '@/data/test'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encryptSpy: EncryptSpy
  updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encryptSpy = new EncryptSpy()
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encryptSpy,
    updateAccessTokenRepositorySpy
  )
  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encryptSpy,
    updateAccessTokenRepositorySpy
  }
}

describe('DbAuthentication UseCase', () => {
  describe('Load Account By Email Repository', () => {
    test('Should call LoadAccountByEmailRepository with correct email', async () => {
      const { sut,loadAccountByEmailRepositorySpy } = makeSut()
      const authentication = mockAuthentication()
      await sut.auth(authentication)
      expect(loadAccountByEmailRepositorySpy.email).toBe(authentication.email)
    })

    test('Should throw if LoadAccountByEmailRepository throws', async () => {
      const { sut,loadAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(loadAccountByEmailRepositorySpy,'loadByEmail').mockImplementationOnce(throwError)
      const promise = sut.auth(mockAuthentication())
      await expect(promise).rejects.toThrow()
    })

    test('Should return null if LoadAccountByEmailRepository returns null', async () => {
      const { sut,loadAccountByEmailRepositorySpy } = makeSut()
      loadAccountByEmailRepositorySpy.accountModel = null
      const accessToken = await sut.auth(mockAuthentication())
      expect(accessToken).toBeNull()
    })
  })

  describe('HashComparer', () => {
    test('Should call HashComparer with correct values', async () => {
      const { sut,hashComparerSpy, loadAccountByEmailRepositorySpy } = makeSut()
      const authentication = mockAuthentication()
      await sut.auth(authentication)
      expect(hashComparerSpy.plaintext).toBe(authentication.password)
      expect(hashComparerSpy.digest).toBe(loadAccountByEmailRepositorySpy.accountModel.password)
    })

    test('Should throw if HashComparer throws', async () => {
      const { sut,hashComparerSpy } = makeSut()
      jest.spyOn(hashComparerSpy,'compare').mockImplementationOnce(throwError)
      const promise = sut.auth(mockAuthentication())
      await expect(promise).rejects.toThrow()
    })

    test('Should return null if HashComparer returns false', async () => {
      const { sut,hashComparerSpy } = makeSut()
      hashComparerSpy.isValid = false
      const accessToken = await sut.auth(mockAuthentication())
      expect(accessToken).toBeNull()
    })
  })

  describe('Encrypt', () => {
    test('Should call Encrypt with correct plaintext', async () => {
      const { sut,encryptSpy, loadAccountByEmailRepositorySpy } = makeSut()
      await sut.auth(mockAuthentication())
      expect(encryptSpy.plaintext).toBe(loadAccountByEmailRepositorySpy.accountModel.id)
    })

    test('Should throw if Encrypt throws', async () => {
      const { sut,encryptSpy } = makeSut()
      jest.spyOn(encryptSpy,'encrypt').mockImplementationOnce(throwError)
      const promise = sut.auth(mockAuthentication())
      await expect(promise).rejects.toThrow()
    })

    test('Should call Encrypt returns a token on success', async () => {
      const { sut, encryptSpy } = makeSut()
      const accessToken = await sut.auth(mockAuthentication())
      expect(accessToken).toBe(encryptSpy.ciphertext)
    })
  })

  describe('Update Access Token Repository', () => {
    test('Should call UpdateAccessTokenRepository with correct values', async () => {
      const { sut, updateAccessTokenRepositorySpy, encryptSpy, loadAccountByEmailRepositorySpy } = makeSut()
      await sut.auth(mockAuthentication())
      expect(updateAccessTokenRepositorySpy.id).toBe(loadAccountByEmailRepositorySpy.accountModel.id)
      expect(updateAccessTokenRepositorySpy.token).toBe(encryptSpy.ciphertext)
    })

    test('Should throw if UpdateAccessTokenRepository throws', async () => {
      const { sut,updateAccessTokenRepositorySpy } = makeSut()
      jest.spyOn(updateAccessTokenRepositorySpy,'updateAccessToken').mockImplementationOnce(throwError)
      const promise = sut.auth(mockAuthentication())
      await expect(promise).rejects.toThrow()
    })
  })
})
