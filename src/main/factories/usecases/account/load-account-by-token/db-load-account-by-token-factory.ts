import { DbLoadAccountByToken } from '../../../../../data/usecases/load-account-by-token/db-load-account-by-token'
import { AccountPgRepository } from '../../../../../infra/db/pg/account/account-pg-repository'
import { JwtAdapter } from '../../../../../infra/cryptography/jwt-adapter/jwt-adapter'
import { LoadAccountByToken } from '../../../../../domain/usecases/load-account-by-token'
import '../../../../config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
  const accountPgRepository = new AccountPgRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountPgRepository)
}
