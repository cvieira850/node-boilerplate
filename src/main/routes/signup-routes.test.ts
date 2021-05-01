import request from 'supertest'
import { Connection, createConnection, getConnection } from 'typeorm'
import { tables } from '../../infra/db/pg/tables'
import app from '../config/app'

let connection: Connection
describe('SignUp Routes', () => {
  beforeAll(async () => {
    connection = await createConnection()
    for (const table of tables) {
      await connection.query(`DROP TABLE IF EXISTS ${table}`)
    }
    await connection.query('DROP TABLE IF EXISTS migrations')

    await connection.runMigrations()
  })
  afterAll(async () => {
    for (const table of tables) {
      await connection.query(`DELETE FROM ${table}`)
    }
    const mainConnection = getConnection()
    await mainConnection.close()
    await connection.close()
  })

  beforeEach(async () => {
    for (const table of tables) {
      await connection.query(`DELETE FROM ${table}`)
    }
  })
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Caio',
        email: 'contato@caiovieira.com.br',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
