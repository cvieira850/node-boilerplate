import { AccountModel } from '@/domain/models/account'

export type AddRoleToUserModel = {
  userId: string
  roleId: string
}

export interface AddRoleToUser {
  addRoleToUser: (data: AddRoleToUserModel) => Promise<AccountModel>
}
