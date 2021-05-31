import { DbLoadAccountByToken } from './db-load-account-by-token'
// import { LoadAccountByTokenRepository } from './db-load-account-by-token-protocols'
import { throwError, mockAccountModel } from '@/domain/test'
import { DecrypterSpy, LoadAccountByTokenRepositorySpy } from '@/data/test'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterSpy: DecrypterSpy
  loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
  const sut = new DbLoadAccountByToken(
    decrypterSpy,
    loadAccountByTokenRepositorySpy
  )
  return {
    sut,
    decrypterSpy,
    loadAccountByTokenRepositorySpy
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
      const { sut, loadAccountByTokenRepositorySpy } = makeSut()
      await sut.loadByToken('any_token','any_role')
      expect(loadAccountByTokenRepositorySpy.token).toBe('any_token')
      expect(loadAccountByTokenRepositorySpy.role).toBe('any_role')
    })

    test('Should return null if LoadAccountByTokenRepository returns null' , async () => {
      const { sut, loadAccountByTokenRepositorySpy } = makeSut()
      loadAccountByTokenRepositorySpy.accountModel = null
      const account = await sut.loadByToken('any_token','any_role')
      expect(account).toBeNull()
    })

    test('Should throw if LoadAccountByTokenRepository throws', async () => {
      const { sut, loadAccountByTokenRepositorySpy } = makeSut()
      jest.spyOn(loadAccountByTokenRepositorySpy,'loadByToken').mockImplementationOnce(throwError)
      const promise = sut.loadByToken('any_token','any_role')
      await expect(promise).rejects.toThrow()
    })

    test('Should returns null if role id is null' , async () => {
      const { sut, loadAccountByTokenRepositorySpy } = makeSut()
      loadAccountByTokenRepositorySpy.accountModel = null
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
    const account = await sut.loadByToken('any_token','any_role')
    expect(account).toEqual(mockAccountModel())
  })
})
