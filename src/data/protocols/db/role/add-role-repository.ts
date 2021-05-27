import { AddRoleParams } from '@/domain/usecases/role/add-role'
import { RoleModel } from '@/domain/models/role'
export interface AddRoleRepository {
  add: (roleData: AddRoleParams) => Promise<RoleModel>
}
