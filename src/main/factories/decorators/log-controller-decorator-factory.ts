import '../../config/env'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { Controller } from '../../../presentation/protocols'
import { LogPgRepository } from '../../../infra/db/pg/log/log-pg-repository'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logPgRepository = new LogPgRepository()
  return new LogControllerDecorator(controller,logPgRepository)
}
