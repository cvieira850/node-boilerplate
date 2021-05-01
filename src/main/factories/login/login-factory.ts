import env from '../../config/env'
import { makeLoginValidation } from './login-validation-factory'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { Controller } from '../../../presentation/protocols'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { LogPgRepository } from '../../../infra/db/pg/log/log-pg-repository'
import { AccountPgRepository } from '../../../infra/db/pg/account/account-pg-repository'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter/jwt-adapter'

export const makeLoginController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountPgRepository = new AccountPgRepository()
  const dbAuthentication = new DbAuthentication(
    accountPgRepository,
    bcryptAdapter,
    jwtAdapter,
    accountPgRepository
  )
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logPgRepository = new LogPgRepository()
  return new LogControllerDecorator(loginController,logPgRepository)
}
