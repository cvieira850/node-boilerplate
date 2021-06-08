
import { AccountPgRepository } from './account-pg-repository'
import Role from '@/infra/db/pg/typeorm/entities/role'
import User from '@/infra/db/pg/typeorm/entities/user'
import { getConnection, getRepository, createConnection } from 'typeorm'
import { mockAddAccountParams, mockAddAccountWithTokenParams, mockAddRoleParams } from '@/domain/test'
import faker from 'faker'

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
      const addAccountParams = mockAddAccountParams()
      const account = await sut.add(addAccountParams)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(addAccountParams.name)
      expect(account.email).toBe(addAccountParams.email)
      expect(account.password).toBe(addAccountParams.password)
    })
  })

  describe('loadByEmail() ',() => {
    test('Should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(addAccountParams)
        .execute()
      const account = await sut.loadByEmail(addAccountParams.email)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(addAccountParams.name)
      expect(account.email).toBe(addAccountParams.email)
      expect(account.password).toBe(addAccountParams.password)
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail(faker.internet.email())
      expect(account).toBeFalsy()
    })
  })

  describe('loadById() ',() => {
    test('Should return null if loadById fails', async () => {
      const sut = makeSut()
      const account = await sut.loadById(faker.datatype.uuid())
      expect(account).toBeFalsy()
    })

    test('Should return an account on loadById success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      const user = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(addAccountParams)
        .execute()
      const account = await sut.loadById(user.generatedMaps[0].id)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(addAccountParams.name)
      expect(account.email).toBe(addAccountParams.email)
      expect(account.password).toBe(addAccountParams.password)
    })
  })

  describe('load()', () => {
    test('Should return an array of accounts on load success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      const addAccountParams2 = mockAddAccountParams()
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(addAccountParams)
        .execute()
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(addAccountParams2)
        .execute()
      const accounts = await sut.load()
      expect(accounts).toBeTruthy()
      expect(accounts[0].name).toBe(addAccountParams.name)
      expect(accounts[0].email).toBe(addAccountParams.email)
      expect(accounts[0].password).toBe(addAccountParams.password)
      expect(accounts[1].name).toBe(addAccountParams2.name)
      expect(accounts[1].email).toBe(addAccountParams2.email)
      expect(accounts[1].password).toBe(addAccountParams2.password)
    })
  })

  describe('addRoleToUser() ', () => {
    test('Should return an account on addRoleToUser success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      const roleName = faker.name.jobTitle()
      const user = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(addAccountParams)
        .execute()
      const role = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values(
          {
            name: roleName
          }
        )
        .execute()
      const fakeAccount = user.generatedMaps[0]
      const fakeRole = role.generatedMaps[0]
      const account = await sut.addRoleToUser({ userId: fakeAccount.id, roleId: fakeRole.id })
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.id).toBe(fakeAccount.id)
      expect(account.name).toBe(addAccountParams.name)
      expect(account.email).toBe(addAccountParams.email)
      expect(account.password).toBe(addAccountParams.password)
      expect(account.role_id).toBe(fakeRole.id)
    })
  })

  describe('updateAccessToken() ',() => {
    test('Should return an account on updateAccessToken success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      const res = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(addAccountParams)
        .execute()
      const fakeAccount = res.generatedMaps[0]
      const accessToken = faker.datatype.uuid()
      const accountRepository = getRepository(User)
      const accountWithOutToken = await accountRepository.findByIds(fakeAccount.id)
      expect(accountWithOutToken[0].access_token).toBeFalsy()
      await sut.updateAccessToken(fakeAccount.id,accessToken)
      const account = await accountRepository.findOne({ id: fakeAccount.id })
      expect(res).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.access_token).toBe(accessToken)
    })
  })

  describe('loadByToken() ',() => {
    test('Should return an account on loadByToken without role success', async () => {
      const sut = makeSut()
      const addAccountWithTokenParams = mockAddAccountWithTokenParams()
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(addAccountWithTokenParams)
        .execute()
      const account = await sut.loadByToken(addAccountWithTokenParams.access_token)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(addAccountWithTokenParams.name)
      expect(account.email).toBe(addAccountWithTokenParams.email)
      expect(account.password).toBe(addAccountWithTokenParams.password)
      expect(account.access_token).toBe(addAccountWithTokenParams.access_token)
    })

    test('Should return an account on loadByToken with role', async () => {
      const sut = makeSut()
      const addRoleParams = mockAddRoleParams()
      const name = faker.name.firstName()
      const accessToken = faker.datatype.uuid()
      const email = faker.internet.email()
      const password = faker.internet.password()
      const resRole = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values(addRoleParams)
        .execute()
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          name,
          email,
          password,
          access_token: accessToken,
          role_id: resRole.generatedMaps[0].id
        })
        .execute()

      const account = await sut.loadByToken(accessToken,addRoleParams.name)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(name)
      expect(account.email).toBe(email)
      expect(account.password).toBe(password)
      expect(account.access_token).toBe(accessToken)
    })

    test('Should return null on loadByToken with wrong role', async () => {
      const sut = makeSut()
      const name = faker.name.firstName()
      const accessToken = faker.datatype.uuid()
      const email = faker.internet.email()
      const password = faker.internet.password()
      const resRole = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values(mockAddRoleParams())
        .execute()
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          name,
          email,
          password,
          access_token: accessToken,
          role_id: resRole.generatedMaps[0].id
        })
        .execute()

      const account = await sut.loadByToken(accessToken,faker.name.jobTitle())
      expect(account).toBeNull()
    })

    test('Should return null on loadByToken with invalid role', async () => {
      const sut = makeSut()
      const addAccountWithTokenParams = mockAddAccountWithTokenParams()
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(addAccountWithTokenParams)
        .execute()

      const account = await sut.loadByToken(addAccountWithTokenParams.access_token,faker.name.jobTitle())
      expect(account).toBeNull()
    })
    test('Should return null on call loadByToken with invalid token', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken(faker.datatype.uuid())
      expect(account).toBeNull()
    })
  })
})
