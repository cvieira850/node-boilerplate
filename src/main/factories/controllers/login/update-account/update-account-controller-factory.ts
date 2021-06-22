import '@/main/config/env'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { UpdateAccountController } from '@/presentation/controllers/login/update-account/update-account-controller'
import { makeUpdateAccountValidation } from './update-account-validation-factory'
import { makeDbLoadAccountById } from '@/main/factories/usecases/account/load-account-by-id/db-load-account-by-id-factory'
import { makeDbUpdateAccount } from '@/main/factories/usecases/account/update-account/db-update-account-factory'

export const makeUpdateAccountController = (): Controller => {
  const controller = new UpdateAccountController(makeUpdateAccountValidation(),makeDbUpdateAccount(),makeDbLoadAccountById())
  return makeLogControllerDecorator(controller)
}
