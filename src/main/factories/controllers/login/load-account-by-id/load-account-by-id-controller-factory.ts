import '@/main/config/env'
import { Controller } from '@/presentation/protocols'
import { LoadAccountByIdController } from '@/presentation/controllers/login/load-account-by-id/load-account-by-id-controller'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadAccountById } from '@/main/factories/usecases/account/load-account-by-id/db-load-account-by-id-factory'

export const makeLoadAccountByIdController = (): Controller => {
  const controller = new LoadAccountByIdController(makeDbLoadAccountById())
  return makeLogControllerDecorator(controller)
}
