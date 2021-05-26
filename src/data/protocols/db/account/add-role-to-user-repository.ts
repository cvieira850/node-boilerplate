import { AccountModel } from '@/domain/models/account'
import { AddRoleToUserModel } from '@/domain/usecases/account/add-role-to-user'
export interface AddRoleToUserRepository {
  addRoleToUser: (data: AddRoleToUserModel) => Promise<AccountModel>
}
