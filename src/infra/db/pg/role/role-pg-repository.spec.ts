
import { getConnection, createConnection } from 'typeorm'
import Role from '../typeorm/entities/role'

import { RolePgRepository } from './role-pg-repository'

describe('Account Pg Repository', () => {
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
    const role = await sut.add({
      name: 'any_name'
    })
    expect(role).toBeTruthy()
    expect(role.id).toBeTruthy()
    expect(role.name).toBe('any_name')
  })

  test('Should return a role on loadByName success', async () => {
    const sut = makeSut()
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values(
        {
          name: 'valid_name'
        }
      )
      .execute()
    const role = await sut.loadByName('valid_name')
    expect(role).toBeTruthy()
    expect(role.id).toBeTruthy()
    expect(role.name).toBe('valid_name')
  })
})
