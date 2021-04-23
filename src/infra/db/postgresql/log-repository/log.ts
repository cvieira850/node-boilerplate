import { getRepository } from 'typeorm'
import { LogErrorRepository } from '../../../../data/protocols/db/log-error-repository'
import Error from '../typeorm/entities/error'

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
