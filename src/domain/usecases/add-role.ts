import { RoleModel } from '@/domain/models/role'

export type AddRoleModel = {
  name: string
}

export interface AddRole {
  add: (data: AddRoleModel) => Promise<RoleModel>
}
