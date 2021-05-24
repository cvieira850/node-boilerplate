import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import Error from '@/infra/db/pg/typeorm/entities/error'
import { getRepository } from 'typeorm'

export class LogPgRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const ErrorRepository = getRepository(Error)
    const ErrorCreated = await ErrorRepository.create(
      {
        error: stack
      }
    )
    await ErrorRepository.save(ErrorCreated)
  }
}
