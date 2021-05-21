import '../../../../config/env'
import { AccountPgRepository } from '../../../../../infra/db/pg/account/account-pg-repository'
import { RolePgRepository } from '../../../../../infra/db/pg/role/role-pg-repository'
import { AddRoleToUser } from '../../../../../domain/usecases/add-role-to-user'
import { DbAddRoleToUser } from '../../../../../data/usecases/add-role-to-user/db-add-role-to-user'

export const makeDbAddRoleToUser = (): AddRoleToUser => {
  const accountPgRepository = new AccountPgRepository()
  const rolePgRepository = new RolePgRepository()
  return new DbAddRoleToUser(accountPgRepository, accountPgRepository, rolePgRepository)
}
