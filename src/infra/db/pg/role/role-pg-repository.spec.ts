
import { RolePgRepository } from './role-pg-repository'
import Role from '@/infra/db/pg/typeorm/entities/role'
import { mockAddRoleParams } from '@/domain/test'
import { getConnection, createConnection } from 'typeorm'
import faker from 'faker'

describe('Role Pg Repository', () => {
  beforeEach(async () => {
    await createConnection()
  })

  afterEach(async () => {
    await getConnection().close()
  })

  const makeSut = (): RolePgRepository => {
    return new RolePgRepository()
  }
  test('Should return a role on add success', async () => {
    const sut = makeSut()
    const addRoleParams = mockAddRoleParams()
    const role = await sut.add(addRoleParams)
    expect(role).toBeTruthy()
    expect(role.id).toBeTruthy()
    expect(role.name).toBe(addRoleParams.name)
  })

  test('Should return a role on loadByName success', async () => {
    const sut = makeSut()
    const addRoleParams = mockAddRoleParams()
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values(addRoleParams)
      .execute()
    const role = await sut.loadByName(addRoleParams.name)
    expect(role).toBeTruthy()
    expect(role.id).toBeTruthy()
    expect(role.name).toBe(addRoleParams.name)
  })

  test('Should return null if loadByName fails', async () => {
    const sut = makeSut()
    const role = await sut.loadByName(faker.name.jobTitle())
    expect(role).toBeFalsy()
  })

  test('Should return null if loadById fails', async () => {
    const sut = makeSut()
    const role = await sut.loadById(faker.datatype.uuid())
    expect(role).toBeFalsy()
  })

  test('Should return a role on loadById success', async () => {
    const sut = makeSut()
    const addRoleParams = mockAddRoleParams()
    const createdRole = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values(addRoleParams)
      .execute()
    const role = await sut.loadById(createdRole.generatedMaps[0].id)
    expect(role).toBeTruthy()
    expect(role.id).toBeTruthy()
    expect(role.name).toBe(addRoleParams.name)
  })
})
