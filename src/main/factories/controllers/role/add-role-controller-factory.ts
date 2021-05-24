import { makeAddRoleValidation } from './add-role-validation-factory'
import '@/main/config/env'
import { Controller } from '@/presentation/protocols'
import { AddRoleController } from '@/presentation/controllers/role/add-role/add-role-controller'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddRole } from '@/main/factories/usecases/role/db-add-role-factory'

export const makeAddRoleController = (): Controller => {
  const controller = new AddRoleController(makeAddRoleValidation(),makeDbAddRole())
  return makeLogControllerDecorator(controller)
}
