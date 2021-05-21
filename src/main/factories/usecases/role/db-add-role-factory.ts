import '../../../config/env'
import { AddRole } from '../../../../domain/usecases/add-role'
import { DbAddRole } from '../../../../data/usecases/add-role/db-add-role'
import { RolePgRepository } from '../../../../infra/db/pg/role/role-pg-repository'

export const makeDbAddRole = (): AddRole => {
  const rolePgRepository = new RolePgRepository()
  return new DbAddRole(rolePgRepository, rolePgRepository)
}
