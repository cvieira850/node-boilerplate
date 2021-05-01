import { Connection, getConnection, getRepository } from 'typeorm'
import createConnection from '../typeorm'
import { tables } from '../tables'
import Error from '../typeorm/entities/error'
import { LogPgRepository } from './log-pg-repository'

let connection: Connection
const makeSut = (): LogPgRepository => {
  return new LogPgRepository()
}

describe('Log Pg Repository', () => {
  beforeAll(async () => {
    connection = await createConnection()
    for (const table of tables) {
      await connection.query(`DROP TABLE IF EXISTS ${table}`)
    }
    await connection.query('DROP TABLE IF EXISTS migrations')

    await connection.runMigrations()
  })

  beforeEach(async () => {
    for (const table of tables) {
      await connection.query(`DELETE FROM ${table}`)
    }
  })

  afterAll(async () => {
    for (const table of tables) {
      await connection.query(`DELETE FROM ${table}`)
    }
    const mainConnection = getConnection()
    await mainConnection.close()
    await connection.close()
  })
  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    jest.setTimeout(30000)
    const ErrorRepository = getRepository(Error)
    const count = await ErrorRepository.count()
    expect(count).toBe(1)
  })
})
