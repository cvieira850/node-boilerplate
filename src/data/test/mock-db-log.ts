import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'

export class LogErrorRepositorySpy implements LogErrorRepository {
  stack: string
  result = null
  async logError (stack: string): Promise<void> {
    this.stack = stack
    return Promise.resolve(this.result)
  }
}
