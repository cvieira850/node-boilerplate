import { AccountModel } from '@/domain/models/account'
import { AddRoleToUserParams } from '@/domain/usecases/account/add-role-to-user'
export interface AddRoleToUserRepository {
  addRoleToUser: (data: AddRoleToUserParams) => Promise<AccountModel>
}
