import '../../../../config/env'
import { DbAuthentication } from '../../../../../data/usecases/authentication/db-authentication'
import { AccountPgRepository } from '../../../../../infra/db/pg/account/account-pg-repository'
import { BcryptAdapter } from '../../../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../../infra/cryptography/jwt-adapter/jwt-adapter'

export const makeDbAuthentication = (): DbAuthentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
  const accountPgRepository = new AccountPgRepository()
  return new DbAuthentication(
    accountPgRepository,
    bcryptAdapter,
    jwtAdapter,
    accountPgRepository
  )
}
