import { RoleModel } from '@/domain/models/role'

export type AddRoleModel = Omit<RoleModel, 'id'>

export interface AddRole {
  add: (data: AddRoleModel) => Promise<RoleModel>
}
