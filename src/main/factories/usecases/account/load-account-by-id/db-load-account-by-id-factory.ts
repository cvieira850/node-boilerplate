import '@/main/config/env'
import { AccountPgRepository } from '@/infra/db/pg/account/account-pg-repository'
import { DbLoadAccountById } from '@/data/usecases/account/load-account-by-id/db-load-account-by-id'
import { LoadAccountById } from '@/domain/usecases/account/load-account-by-id'

export const makeDbLoadAccountById = (): LoadAccountById => {
  const accountPgRepository = new AccountPgRepository()
  return new DbLoadAccountById(accountPgRepository)
}
