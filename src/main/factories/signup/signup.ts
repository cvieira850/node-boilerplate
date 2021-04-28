import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AccountPgRepository } from '../../../infra/db/postgresql/account-repository/account'
import { LogPgRepository } from '../../../infra/db/postgresql/log-repository/log'
import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountPgRepository = new AccountPgRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountPgRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
  const logPgRepository = new LogPgRepository()
  return new LogControllerDecorator(signUpController, logPgRepository)
}
