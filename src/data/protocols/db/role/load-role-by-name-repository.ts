import { RoleModel } from '../../../../domain/models/role'

export interface LoadRoleByNameRepository {
  loadByName: (name: string) => Promise<RoleModel>
}
