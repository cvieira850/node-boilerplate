import { getConnection, getRepository } from 'typeorm'
import createConnection from '../typeorm'
import Error from '../typeorm/entities/error'
import { LogPgRepository } from './log-pg-repository'

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
    await sut.logError('any_error')
    jest.setTimeout(30000)
    const ErrorRepository = getRepository(Error)
    const count = await ErrorRepository.count()
    expect(count).toBe(1)
  })
})
