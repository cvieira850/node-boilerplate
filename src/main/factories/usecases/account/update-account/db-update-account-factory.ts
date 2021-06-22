import '@/main/config/env'
import { AccountPgRepository } from '@/infra/db/pg/account/account-pg-repository'
import { DbUpdateAccount } from '@/data/usecases/account/update-account/db-update-account'
import { UpdateAccount } from '@/domain/usecases/account/update-account'

export const makeDbUpdateAccount = (): UpdateAccount => {
  const accountPgRepository = new AccountPgRepository()
  return new DbUpdateAccount(accountPgRepository)
}
