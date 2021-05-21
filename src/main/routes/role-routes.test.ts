import request from 'supertest'
import { createConnection, getConnection } from 'typeorm'
import app from '../config/app'

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
  })
})
