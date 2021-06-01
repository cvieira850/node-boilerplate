import { LogPgRepository } from './log-pg-repository'
import createConnection from '@/infra/db/pg/typeorm'
import Error from '@/infra/db/pg/typeorm/entities/error'
import { getConnection, getRepository } from 'typeorm'
import faker from 'faker'

const makeSut = (): LogPgRepository => {
  return new LogPgRepository()
}

describe('Log Pg Repository', () => {
  beforeEach(async () => {
    await createConnection()
  })

  afterEach(async () => {
    await getConnection().close()
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError(faker.random.word())
    jest.setTimeout(30000)
    const ErrorRepository = getRepository(Error)
    const count = await ErrorRepository.count()
    expect(count).toBe(1)
  })
})
