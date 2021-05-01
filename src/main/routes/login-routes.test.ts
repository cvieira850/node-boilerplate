import { hash } from 'bcrypt'
import request from 'supertest'
import { Connection, createConnection, getConnection } from 'typeorm'
import { tables } from '../../infra/db/pg/tables'
import User from '../../infra/db/pg/typeorm/entities/user'
import app from '../config/app'

let connection: Connection
describe('Login Routes', () => {
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
  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
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
  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123',12)
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(
          {
            name: 'valid_name',
            email: 'contato@caiovieira.com.br',
            password
          }
        )
        .execute()
      await request(app)
        .post('/api/login')
        .send({
          email: 'contato@caiovieira.com.br',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 401 on invalid credentials', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'contato@caiovieira.com.br',
          password: '123'
        })
        .expect(401)
    })
  })
})
