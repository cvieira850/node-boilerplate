import { AddRoleModel } from '@/domain/usecases/add-role'
import { RoleModel } from '@/domain/models/role'
export interface AddRoleRepository {
  add: (roleData: AddRoleModel) => Promise<RoleModel>
}
