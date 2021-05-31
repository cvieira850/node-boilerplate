import { DbLoadAccountByToken } from './db-load-account-by-token'
import { LoadAccountByTokenRepository } from './db-load-account-by-token-protocols'
import { throwError, mockAccountModel } from '@/domain/test'
import { DecrypterSpy, mockLoadAccountByTokenRepository } from '@/data/test'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterSpy: DecrypterSpy
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(
    decrypterSpy,
    loadAccountByTokenRepositoryStub
  )
  return {
    sut,
    decrypterSpy,
    loadAccountByTokenRepositoryStub
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  describe('Decrypter',() => {
    test('Should call Decrypter with correct values' , async () => {
      const { sut, decrypterSpy } = makeSut()
      await sut.loadByToken('any_token','any_role')
      expect(decrypterSpy.ciphertext).toBe('any_token')
    })

    test('Should return null if Decrypter returns null' , async () => {
      const { sut, decrypterSpy } = makeSut()
      decrypterSpy.plaintext = null
      const account = await sut.loadByToken('any_token','any_role')
      expect(account).toBeNull()
    })

    test('Should throw if Decrypter throws', async () => {
      const { sut, decrypterSpy } = makeSut()
      jest.spyOn(decrypterSpy,'decrypt').mockImplementationOnce(throwError)
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
      jest.spyOn(loadAccountByTokenRepositoryStub,'loadByToken').mockReturnValueOnce(Promise.resolve(null))
      const account = await sut.loadByToken('any_token','any_role')
      expect(account).toBeNull()
    })

    test('Should throw if LoadAccountByTokenRepository throws', async () => {
      const { sut, loadAccountByTokenRepositoryStub } = makeSut()
      jest.spyOn(loadAccountByTokenRepositoryStub,'loadByToken').mockImplementationOnce(throwError)
      const promise = sut.loadByToken('any_token','any_role')
      await expect(promise).rejects.toThrow()
    })

    test('Should returns null if role id is null' , async () => {
      const { sut, loadAccountByTokenRepositoryStub } = makeSut()
      jest.spyOn(loadAccountByTokenRepositoryStub,'loadByToken').mockReturnValueOnce(
        Promise.resolve(null))
      const account = await sut.loadByToken('any_token','any_role')
      expect(account).toBeNull()
    })
  })

  test('Should return an account on success' , async () => {
    const { sut } = makeSut()
    const account = await sut.loadByToken('any_token')
    expect(account).toEqual(mockAccountModel())
  })

  test('Should return an account on success' , async () => {
    const { sut } = makeSut()
    const account = await sut.loadByToken('any_token','valid_role_name')
    expect(account).toEqual(mockAccountModel())
  })
})
