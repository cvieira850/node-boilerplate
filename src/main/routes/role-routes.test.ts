import app from '@/main/config/app'
import User from '@/infra/db/pg/typeorm/entities/user'
import { hash } from 'bcrypt'
import request from 'supertest'
import { sign } from 'jsonwebtoken'
import { createConnection, getConnection, getRepository } from 'typeorm'

describe('Role Routes', () => {
  beforeEach(async () => {
    await createConnection()
  })

  afterEach(async () => {
    await getConnection().close()
  })

  describe('POST /roles', () => {
    test('Should return 403 on add role without access token', async () => {
      await request(app)
        .post('/api/roles')
        .send({
          name: 'any_name'
        })
        .expect(403)
    })

    test('Should return 200 on add role with valid token', async () => {
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
      const id = res.generatedMaps[0].id
      const accessToken = sign(id,process.env.JWT_SECRET)
      const UserRepository = getRepository(User)
      const user = await UserRepository.findOne({ id: id })
      user.access_token = accessToken
      await UserRepository.save(user)
      console.log(user,accessToken)
      await request(app)
        .post('/api/roles')
        .set('x-access-token', accessToken)
        .send({
          name: 'any_ok'
        })
        .expect(200)
    })
  })
})
