import { RoleModel } from '@/domain/models/role'

export interface AddRoleModel {
  name: string
}

export interface AddRole {
  add: (data: AddRoleModel) => Promise<RoleModel>
}
