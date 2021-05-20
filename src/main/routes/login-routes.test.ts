import app from '../config/app'
import { hash } from 'bcrypt'
import request from 'supertest'
import { createConnection, getConnection } from 'typeorm'
import User from '../../infra/db/pg/typeorm/entities/user'
import Role from '../../infra/db/pg/typeorm/entities/role'

describe('Login Routes', () => {
  beforeEach(async () => {
    await createConnection()
  })

  afterEach(async () => {
    await getConnection().close()
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

  describe('POST /users/role', () => {
    test('Should return 200 on add role', async () => {
      const password = await hash('123',12)
      const res = await getConnection()
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
      const resRole = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values(
          {
            name: 'valid_role_name'
          }
        )
        .execute()
      const fakeAccount = res.generatedMaps[0]
      const fakeRole = resRole.generatedMaps[0]
      const response = await request(app)
        .post('/api/users/role')
        .send({
          userId: fakeAccount.id,
          roleId: fakeRole.id
        })
      console.log(response)
    })
  })
})
