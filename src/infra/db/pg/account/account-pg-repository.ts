
import { LoadAccountByIdRepository } from '../../../../data/usecases/add-role-to-user/db-add-role-to-user-protocols'
import { getRepository } from 'typeorm'
import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/account/update-access-token-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import User from '../typeorm/entities/user'

export class AccountPgRepository implements
AddAccountRepository,
LoadAccountByEmailRepository,
UpdateAccessTokenRepository,
LoadAccountByIdRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const userRepository = getRepository(User)
    const userCreated = userRepository.create(accountData)
    const account = await userRepository.save(userCreated)
    return account
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const userRepository = getRepository(User)
    const account = await userRepository.findOne({ email })
    if (account) {
      return account
    }
    return null
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const UserRepository = getRepository(User)
    const account = await UserRepository.findOne(id)
    account.access_token = token
    await UserRepository.save(account)
  }

  async loadById (id: string): Promise<AccountModel> {
    const userRepository = getRepository(User)
    await userRepository.findOne(id)
    return new Promise(resolve => resolve(null))
  }
}
