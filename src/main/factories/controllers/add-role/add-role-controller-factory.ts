import '../../../config/env'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { AddRoleController } from '../../../../presentation/controllers/role/add-role/add-role-controller'
import { makeAddRoleValidation } from './add-role-validation-factory'
import { makeDbAddRole } from '../../usecases/add-role/db-add-role-factory'

export const makeAddRoleController = (): Controller => {
  const controller = new AddRoleController(makeAddRoleValidation(),makeDbAddRole())
  return makeLogControllerDecorator(controller)
}
