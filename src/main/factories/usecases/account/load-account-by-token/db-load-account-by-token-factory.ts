import '@/main/config/env'
import { AccountPgRepository } from '@/infra/db/pg/account/account-pg-repository'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { DbLoadAccountByToken } from '@/data/usecases/account/load-account-by-token/db-load-account-by-token'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
  const accountPgRepository = new AccountPgRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountPgRepository)
}
