import { RoleModel } from '../../../../domain/models/role'
export interface LoadRoleByIdRepository {
  loadById: (roleId: string) => Promise<RoleModel>
}
