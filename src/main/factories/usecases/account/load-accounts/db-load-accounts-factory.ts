import '@/main/config/env'
import { AccountPgRepository } from '@/infra/db/pg/account/account-pg-repository'
import { LoadAccounts } from '@/domain/usecases/account/load-accounts'
import { DbLoadAccounts } from '@/data/usecases/account/load-accounts/db-load-accounts'

export const makeDbLoadAccounts = (): LoadAccounts => {
  const accountPgRepository = new AccountPgRepository()
  return new DbLoadAccounts(accountPgRepository)
}
