
import { getRepository } from 'typeorm'
import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import User from '../typeorm/entities/user'

export class AccountPgRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const userRepository = getRepository(User)
    const userCreated = userRepository.create(accountData)
    const account = await userRepository.save(userCreated)
    return account
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const userRepository = getRepository(User)
    const account = userRepository.findOne({ email })
    return account
  }
}
