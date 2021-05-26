import '@/main/config/env'
import { AccountPgRepository } from '@/infra/db/pg/account/account-pg-repository'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account'
import { AddAccount } from '@/domain/usecases/account/add-account'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountPgRepository = new AccountPgRepository()
  return new DbAddAccount(bcryptAdapter, accountPgRepository, accountPgRepository)
}
