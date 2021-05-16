import { RoleModel } from '../models/role'

export interface AddRoleModel {
  name: string
}

export interface AddRole {
  add: (account: AddRoleModel) => Promise<RoleModel>
}
