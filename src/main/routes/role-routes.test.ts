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
    test('Should return 200 on add role success', async () => {
      await request(app)
        .post('/api/roles')
        .send({
          name: 'any_name'
        })
        .expect(200)
    })
  })
})
