import { DbAuthentication } from './db-authentication'
import {
  UpdateAccessTokenRepository
} from './db-authentication-protocols'
import { mockAuthentication, throwError } from '@/domain/test'
import { EncryptSpy, HashComparerSpy, LoadAccountByEmailRepositorySpy, mockUpdateAccessTokenRepository } from '@/data/test'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encryptSpy: EncryptSpy
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encryptSpy = new EncryptSpy()
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encryptSpy,
    updateAccessTokenRepositoryStub
  )
  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encryptSpy,
    updateAccessTokenRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  describe('Load Account By Email Repository', () => {
    test('Should call LoadAccountByEmailRepository with correct email', async () => {
      const { sut,loadAccountByEmailRepositorySpy } = makeSut()
      await sut.auth(mockAuthentication())
      expect(loadAccountByEmailRepositorySpy.email).toBe('any_email@mail.com')
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
      const { sut,hashComparerSpy } = makeSut()
      await sut.auth(mockAuthentication())
      expect(hashComparerSpy.plaintext).toBe('any_password')
      expect(hashComparerSpy.digest).toBe('any_password')
    })

    test('Should throw if HashComparer throws', async () => {
      const { sut,hashComparerSpy } = makeSut()
      jest.spyOn(hashComparerSpy,'compare').mockImplementationOnce(throwError)
      const promise = sut.auth(mockAuthentication())
      await expect(promise).rejects.toThrow()
    })

    test('Should return null if HashComparer returns false', async () => {
      const { sut,hashComparerSpy } = makeSut()
      jest.spyOn(hashComparerSpy,'compare').mockReturnValueOnce(Promise.resolve(false))
      const accessToken = await sut.auth(mockAuthentication())
      expect(accessToken).toBeNull()
    })
  })

  describe('Encrypt', () => {
    test('Should call Encrypt with correct plaintext', async () => {
      const { sut,encryptSpy } = makeSut()
      await sut.auth(mockAuthentication())
      expect(encryptSpy.plaintext).toBe('any_id')
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
      const { sut, updateAccessTokenRepositoryStub, encryptSpy } = makeSut()
      const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub,'updateAccessToken')
      await sut.auth(mockAuthentication())
      expect(updateSpy).toHaveBeenCalledWith('any_id',encryptSpy.ciphertext)
    })

    test('Should throw if UpdateAccessTokenRepository throws', async () => {
      const { sut,updateAccessTokenRepositoryStub } = makeSut()
      jest.spyOn(updateAccessTokenRepositoryStub,'updateAccessToken').mockImplementationOnce(throwError)
      const promise = sut.auth(mockAuthentication())
      await expect(promise).rejects.toThrow()
    })
  })
})
