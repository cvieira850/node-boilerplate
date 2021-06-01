import { RoleModel } from '@/domain/models/role'
import { mockRoleModel } from '@/domain/test'
import { AddRole, AddRoleParams } from '@/domain/usecases/role/add-role'

export class AddRoleSpy implements AddRole {
  roleModel = mockRoleModel()
  data: AddRoleParams
  async add (data: AddRoleParams): Promise<RoleModel> {
    this.data = data
    return Promise.resolve(this.roleModel)
  }
}
