import { makeAddRoleToUserValidation } from './add-role-to-user-validation-factory'
import '@/main/config/env'
import { Controller } from '@/presentation/protocols'
import { AddRoleToUserController } from '@/presentation/controllers/login/add-role-to-user/add-role-to-user-controller'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddRoleToUser } from '@/main/factories/usecases/account/add-role-to-user/db-add-role-to-user-factory'

export const makeAddRoleToUserController = (): Controller => {
  const controller = new AddRoleToUserController(makeAddRoleToUserValidation(), makeDbAddRoleToUser())
  return makeLogControllerDecorator(controller)
}
