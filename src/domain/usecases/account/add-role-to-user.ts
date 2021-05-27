import { AccountModel } from '@/domain/models/account'

export type AddRoleToUserParams = {
  userId: string
  roleId: string
}

export interface AddRoleToUser {
  addRoleToUser: (data: AddRoleToUserParams) => Promise<AccountModel>
}
