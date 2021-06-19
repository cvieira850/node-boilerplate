import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { AddRoleToUserRepository } from '@/data/protocols/db/account/add-role-to-user-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { LoadAccountByIdRepository } from '@/data/protocols/db/account/load-account-by-id-repository'
import { LoadAccountsRepository } from '@/data/protocols/db/account/load-accounts-repository'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models/account'
import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { AddRoleToUserParams } from '@/domain/usecases/account/add-role-to-user'
import { UpdateAccountParams } from '@/domain/usecases/account/update-account'
import { UpdateAccountRepository } from '../protocols/db/account/update-account-repository'

export class AddAccountRepositorySpy implements AddAccountRepository {
  accountModel = mockAccountModel()
  addAccountParams: AddAccountParams

  async add (accountData: AddAccountParams): Promise<AccountModel> {
    this.addAccountParams = accountData
    return Promise.resolve(this.accountModel)
  }
}

export class AddRoleToUserRepositorySpy implements AddRoleToUserRepository {
  data: AddRoleToUserParams
  accountModel = mockAccountModel()

  async addRoleToUser (data: AddRoleToUserParams): Promise<AccountModel> {
    this.data = data
    return Promise.resolve(this.accountModel)
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  accountModel = mockAccountModel()
  email: string

  async loadByEmail (email: string): Promise<AccountModel> {
    this.email = email
    return Promise.resolve(this.accountModel)
  }
}

export class LoadAccountByIdRepositorySpy implements LoadAccountByIdRepository {
  accountModel = mockAccountModel()
  userId: string

  async loadById (userId: string): Promise<AccountModel> {
    this.userId = userId
    return Promise.resolve(this.accountModel)
  }
}

export class LoadAccountsRepositorySpy implements LoadAccountsRepository {
  result = [mockAccountModel(),mockAccountModel()]
  userId: string

  async load (): Promise<AccountModel[]> {
    return Promise.resolve(this.result)
  }
}
export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  accountModel = mockAccountModel()
  token: string
  role: string

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    this.token = token
    this.role = role
    return Promise.resolve(this.accountModel)
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepositorySpy {
  result = null
  id: string
  token: string

  async updateAccessToken (id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
    return Promise.resolve(this.result)
  }
}

export class UpdateAccountRepositorySpy implements UpdateAccountRepository {
  accountModel = mockAccountModel()
  updateAccountParams: UpdateAccountParams

  async update (accountData: UpdateAccountParams): Promise<AccountModel> {
    this.updateAccountParams = accountData
    return Promise.resolve(this.accountModel)
  }
}
