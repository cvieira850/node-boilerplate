import '@/main/config/env'
import { Controller } from '@/presentation/protocols'
import { LogPgRepository } from '@/infra/db/pg/log/log-pg-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logPgRepository = new LogPgRepository()
  return new LogControllerDecorator(controller,logPgRepository)
}
