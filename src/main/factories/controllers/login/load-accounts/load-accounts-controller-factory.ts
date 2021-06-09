import '@/main/config/env'
import { Controller } from '@/presentation/protocols'
import { LoadAccountsController } from '@/presentation/controllers/login/load-accounts/load-accounts-controller'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadAccounts } from '@/main/factories/usecases/account/load-accounts/db-load-accounts-factory'

export const makeLoadAccountsController = (): Controller => {
  const controller = new LoadAccountsController(makeDbLoadAccounts())
  return makeLogControllerDecorator(controller)
}
