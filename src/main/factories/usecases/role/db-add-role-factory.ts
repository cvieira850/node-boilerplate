import '@/main/config/env'
import { AddRole } from '@/domain/usecases/role/add-role'
import { DbAddRole } from '@/data/usecases/role/add-role/db-add-role'
import { RolePgRepository } from '@/infra/db/pg/role/role-pg-repository'

export const makeDbAddRole = (): AddRole => {
  const rolePgRepository = new RolePgRepository()
  return new DbAddRole(rolePgRepository, rolePgRepository)
}
