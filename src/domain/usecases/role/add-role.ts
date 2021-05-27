import { RoleModel } from '@/domain/models/role'

export type AddRoleParams = Omit<RoleModel, 'id'>

export interface AddRole {
  add: (data: AddRoleParams) => Promise<RoleModel>
}
