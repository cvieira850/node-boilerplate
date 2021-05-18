import { AccountModel } from '../models/account'

export interface AddRoleToUserModel {
  userId: string
  roleId: string
}

export interface AddRoleToUser {
  addRoleToUser: (data: AddRoleToUserModel) => Promise<AccountModel>
}