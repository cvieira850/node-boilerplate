import { AccountModel } from '@/domain/models/account'
import { AddRoleToUser, AddRoleToUserParams } from '@/domain/usecases/account/add-role-to-user'
import { mockAccountModel } from '@/domain/test'

export class AddRoleToUserSpy implements AddRoleToUser {
  accountModel = mockAccountModel()
  data: AddRoleToUserParams
  async addRoleToUser (data: AddRoleToUserParams): Promise<AccountModel> {
    this.data = data
    return Promise.resolve(this.accountModel)
  }
}
