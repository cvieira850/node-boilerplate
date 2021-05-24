
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { AddRoleToUserRepository } from '@/data/protocols/db/account/add-role-to-user-repository'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { LoadAccountByIdRepository } from '@/data/protocols/db/account/load-account-by-id-repository'
import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usecases/add-account'
import { AddRoleToUserModel } from '@/domain/usecases/add-role-to-user'
import User from '@/infra/db/pg/typeorm/entities/user'
import Role from '@/infra/db/pg/typeorm/entities/role'

import { getRepository } from 'typeorm'

export class AccountPgRepository implements
AddAccountRepository,
LoadAccountByEmailRepository,
UpdateAccessTokenRepository,
LoadAccountByIdRepository,
AddRoleToUserRepository,
LoadAccountByTokenRepository {
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
    const account = await userRepository.findOne(id)
    if (account) {
      return account
    }
    return null
  }

  async addRoleToUser (data: AddRoleToUserModel): Promise<AccountModel> {
    const { userId, roleId } = data
    const UserRepository = getRepository(User)
    const RoleRepository = getRepository(Role)
    const account = await UserRepository.findOne(userId)
    const role = await RoleRepository.findOne(roleId)
    account.role_id = roleId
    account.role = role
    const updatedAccount = await UserRepository.save(account)
    return updatedAccount
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    const UserRepository = getRepository(User)
    const account = await UserRepository.findOne({ access_token: token })
    if (account) {
      if (role) {
        const RoleRepository = getRepository(Role)
        const searchedRole = await RoleRepository.findOne({ name: role })
        if (searchedRole?.id === account.role_id) {
          return account
        }
        return null
      }
      return account
    }
    return null
  }
}
