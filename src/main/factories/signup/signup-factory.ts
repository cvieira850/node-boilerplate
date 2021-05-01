import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AccountPgRepository } from '../../../infra/db/pg/account/account-pg-repository'
import { LogPgRepository } from '../../../infra/db/pg/log/log-pg-repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountPgRepository = new AccountPgRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountPgRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
  const logPgRepository = new LogPgRepository()
  return new LogControllerDecorator(signUpController, logPgRepository)
}
