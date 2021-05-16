
import { getConnection, createConnection } from 'typeorm'

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
})
