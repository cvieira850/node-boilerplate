import { DbAuthentication } from './db-authentication'
import {
  Encrypt,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository
} from './db-authentication-protocols'
import { mockAuthentication, throwError } from '@/domain/test'
import { mockEncrypt, HashComparerSpy, mockLoadAccountByEmailRepository, mockUpdateAccessTokenRepository } from '@/data/test'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerSpy: HashComparerSpy
  encryptStub: Encrypt
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const hashComparerSpy = new HashComparerSpy()
  const encryptStub = mockEncrypt()
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerSpy,
    encryptStub,
    updateAccessTokenRepositoryStub
  )
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerSpy,
    encryptStub,
    updateAccessTokenRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  describe('Load Account By Email Repository', () => {
    test('Should call LoadAccountByEmailRepository with correct email', async () => {
      const { sut,loadAccountByEmailRepositoryStub } = makeSut()
      const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub,'loadByEmail')
      await sut.auth(mockAuthentication())
      expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
    })

    test('Should throw if LoadAccountByEmailRepository throws', async () => {
      const { sut,loadAccountByEmailRepositoryStub } = makeSut()
      jest.spyOn(loadAccountByEmailRepositoryStub,'loadByEmail').mockImplementationOnce(throwError)
      const promise = sut.auth(mockAuthentication())
      await expect(promise).rejects.toThrow()
    })

    test('Should return null if LoadAccountByEmailRepository returns null', async () => {
      const { sut,loadAccountByEmailRepositoryStub } = makeSut()
      jest.spyOn(loadAccountByEmailRepositoryStub,'loadByEmail').mockReturnValueOnce(null)
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
      const { sut,encryptStub } = makeSut()
      const encryptSpy = jest.spyOn(encryptStub,'encrypt')
      await sut.auth(mockAuthentication())
      expect(encryptSpy).toHaveBeenCalledWith('any_id')
    })

    test('Should throw if Encrypt throws', async () => {
      const { sut,encryptStub } = makeSut()
      jest.spyOn(encryptStub,'encrypt').mockImplementationOnce(throwError)
      const promise = sut.auth(mockAuthentication())
      await expect(promise).rejects.toThrow()
    })

    test('Should call Encrypt returns a token on success', async () => {
      const { sut } = makeSut()
      const accessToken = await sut.auth(mockAuthentication())
      expect(accessToken).toBe('any_token')
    })
  })

  describe('Update Access Token Repository', () => {
    test('Should call UpdateAccessTokenRepository with correct values', async () => {
      const { sut, updateAccessTokenRepositoryStub } = makeSut()
      const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub,'updateAccessToken')
      await sut.auth(mockAuthentication())
      expect(updateSpy).toHaveBeenCalledWith('any_id','any_token')
    })

    test('Should throw if UpdateAccessTokenRepository throws', async () => {
      const { sut,updateAccessTokenRepositoryStub } = makeSut()
      jest.spyOn(updateAccessTokenRepositoryStub,'updateAccessToken').mockImplementationOnce(throwError)
      const promise = sut.auth(mockAuthentication())
      await expect(promise).rejects.toThrow()
    })
  })
})
