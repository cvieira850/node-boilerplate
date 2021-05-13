import env from '../../config/env'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter/jwt-adapter'
import { AccountPgRepository } from '../../../infra/db/pg/account/account-pg-repository'
import { LogPgRepository } from '../../../infra/db/pg/log/log-pg-repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeSignUpValidation } from './signup-validation-factory'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountPgRepository = new AccountPgRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountPgRepository)
  const dbAuthentication = new DbAuthentication(
    accountPgRepository,
    bcryptAdapter,
    jwtAdapter,
    accountPgRepository
  )
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation(),dbAuthentication)
  const logPgRepository = new LogPgRepository()
  return new LogControllerDecorator(signUpController, logPgRepository)
}
