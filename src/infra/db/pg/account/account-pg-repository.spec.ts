
import { getConnection, getRepository, createConnection } from 'typeorm'
import User from '../typeorm/entities/user'
import { AccountPgRepository } from './account-pg-repository'

describe('Account Pg Repository', () => {
  beforeEach(async () => {
    await createConnection()
  })

  afterEach(async () => {
    await getConnection().close()
  })

  const makeSut = (): AccountPgRepository => {
    return new AccountPgRepository()
  }
  test('Should return an account on add success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(
        {
          name: 'valid_name',
          email: 'valid_email@email.com',
          password: 'valid_password'
        }
      )
      .execute()
    const account = await sut.loadByEmail('valid_email@email.com')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('valid_name')
    expect(account.email).toBe('valid_email@email.com')
    expect(account.password).toBe('valid_password')
  })

  test('Should return null if loadByEmail fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('valid_email@email.com')
    expect(account).toBeFalsy()
  })

  test('Should return an account on updateAccessToken success', async () => {
    const sut = makeSut()
    const res = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(
        {
          name: 'valid_name',
          email: 'valid_email@email.com',
          password: 'valid_password'
        }
      )
      .execute()
    const fakeAccount = res.generatedMaps[0]
    const accountRepository = getRepository(User)
    const accountWithOutToken = await accountRepository.findByIds(fakeAccount.id)
    expect(accountWithOutToken[0].access_token).toBeFalsy()
    await sut.updateAccessToken(fakeAccount.id,'any_token')
    const account = await accountRepository.findOne({ id: fakeAccount.id })
    expect(res).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.access_token).toBe('any_token')
  })
})
