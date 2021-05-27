import { AccountModel } from '@/domain/models/account'
import { AddRoleToUser, AddRoleToUserParams } from '@/domain/usecases/account/add-role-to-user'
import { mockAccountModel } from '@/domain/test'

export const mockAddRoleToUser = (): AddRoleToUser => {
  class AddRoleToUserStub implements AddRoleToUser {
    async addRoleToUser (data: AddRoleToUserParams): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockAccountModel()))
    }
  }
  return new AddRoleToUserStub()
}
