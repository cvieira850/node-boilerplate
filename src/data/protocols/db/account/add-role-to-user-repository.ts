import { AccountModel } from '../../../../domain/models/account'
import { AddRoleToUserModel } from 'domain/usecases/add-role-to-user'
export interface AddRoleToUserRepository {
  addRoleToUser: (data: AddRoleToUserModel) => Promise<AccountModel>
}
