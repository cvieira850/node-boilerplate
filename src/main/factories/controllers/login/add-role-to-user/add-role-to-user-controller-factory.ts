import '../../../../config/env'
import { AddRoleToUserController } from '../../../../../presentation/controllers/login/add-role-to-user/add-role-to-user-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbAddRoleToUser } from '../../../usecases/account/add-role-to-user/db-add-role-to-user-factory'
import { makeAddRoleToUserValidation } from './add-role-to-user-validation-factory'

export const makeAddRoleToUserController = (): Controller => {
  const controller = new AddRoleToUserController(makeAddRoleToUserValidation(), makeDbAddRoleToUser())
  return makeLogControllerDecorator(controller)
}
