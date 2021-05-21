
import { getConnection, getRepository, createConnection } from 'typeorm'
import Role from '../typeorm/entities/role'
import User from '../typeorm/entities/user'
import { AccountPgRepository } from './account-pg-repository'

interface AccountData {
  name: string
  email: string
  password: string
  access_token?: string
}

const makeAccountData = (): AccountData => ({
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid_password'
})

const makeSut = (): AccountPgRepository => {
  return new AccountPgRepository()
}

describe('Account Pg Repository', () => {
  beforeEach(async () => {
    await createConnection()
  })

  afterEach(async () => {
    await getConnection().close()
  })
  describe('add() ',() => {
    test('Should return an account on add success', async () => {
      const sut = makeSut()
      const account = await sut.add(makeAccountData())
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('valid_name')
      expect(account.email).toBe('valid_email@email.com')
      expect(account.password).toBe('valid_password')
    })
  })

  describe('loadByEmail() ',() => {
    test('Should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(makeAccountData())
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
  })

  describe('loadById() ',() => {
    test('Should return null if loadById fails', async () => {
      const sut = makeSut()
      const account = await sut.loadById('d1ffd121-53b5-4364-9f2d-651369faba83')
      expect(account).toBeFalsy()
    })

    test('Should return an account on loadById success', async () => {
      const sut = makeSut()
      const user = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(makeAccountData())
        .execute()
      const account = await sut.loadById(user.generatedMaps[0].id)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('valid_name')
      expect(account.email).toBe('valid_email@email.com')
      expect(account.password).toBe('valid_password')
    })
  })

  describe('addRoleToUser() ', () => {
    test('Should return an account on addRoleToUser success', async () => {
      const sut = makeSut()
      const user = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(makeAccountData())
        .execute()
      const role = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values(
          {
            name: 'valid_name'
          }
        )
        .execute()
      const fakeAccount = user.generatedMaps[0]
      const fakeRole = role.generatedMaps[0]
      const account = await sut.addRoleToUser({ userId: fakeAccount.id, roleId: fakeRole.id })
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.id).toBe(fakeAccount.id)
      expect(account.name).toBe('valid_name')
      expect(account.email).toBe('valid_email@email.com')
      expect(account.password).toBe('valid_password')
      expect(account.role_id).toBe(fakeRole.id)
    })
  })

  describe('updateAccessToken() ',() => {
    test('Should return an account on updateAccessToken success', async () => {
      const sut = makeSut()
      const res = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(makeAccountData())
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

  describe('loadByToken() ',() => {
    test('Should return an account on loadByToken without role success', async () => {
      const sut = makeSut()
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          name: 'valid_name',
          email: 'valid_email@email.com',
          password: 'valid_password',
          access_token: 'valid_token'
        })
        .execute()
      const account = await sut.loadByToken('valid_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('valid_name')
      expect(account.email).toBe('valid_email@email.com')
      expect(account.password).toBe('valid_password')
      expect(account.access_token).toBe('valid_token')
    })

    test('Should return an account on loadByToken with role', async () => {
      const sut = makeSut()
      const resRole = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values({
          name: 'valid_role_name'
        })
        .execute()
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          name: 'valid_name',
          email: 'valid_email@email.com',
          password: 'valid_password',
          access_token: 'valid_token',
          role_id: resRole.generatedMaps[0].id
        })
        .execute()

      const account = await sut.loadByToken('valid_token','valid_role_name')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('valid_name')
      expect(account.email).toBe('valid_email@email.com')
      expect(account.password).toBe('valid_password')
      expect(account.access_token).toBe('valid_token')
    })

    test('Should return null on loadByToken with wrong role', async () => {
      const sut = makeSut()
      const resRole = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values({
          name: 'valid_role_name'
        })
        .execute()
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          name: 'valid_name',
          email: 'valid_email@email.com',
          password: 'valid_password',
          access_token: 'valid_token',
          role_id: resRole.generatedMaps[0].id
        })
        .execute()

      const account = await sut.loadByToken('valid_token','valid_role_name2')
      expect(account).toBeNull()
    })

    test('Should return null on loadByToken with invalid role', async () => {
      const sut = makeSut()
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          name: 'valid_name',
          email: 'valid_email@email.com',
          password: 'valid_password',
          access_token: 'valid_token',
          role_id: null
        })
        .execute()

      const account = await sut.loadByToken('valid_token','valid_role_name')
      expect(account).toBeNull()
    })
    test('Should return null on call loadByToken with invalid token', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken('valid_token')
      expect(account).toBeNull()
    })
  })
})
