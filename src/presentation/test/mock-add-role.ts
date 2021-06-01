import { RoleModel } from '@/domain/models/role'
import { mockRoleModel } from '@/domain/test'
import { AddRole, AddRoleParams } from '@/domain/usecases/role/add-role'

export const mockAddRole = (): AddRole => {
  class AddRoleStub implements AddRole {
    async add (data: AddRoleParams): Promise<RoleModel> {
      return Promise.resolve(mockRoleModel())
    }
  }
  return new AddRoleStub()
}

export class AddROleSpy implements AddRole {
  roleModel = mockRoleModel()
  data: AddRoleParams
  async add (data: AddRoleParams): Promise<RoleModel> {
    this.data = data
    return Promise.resolve(this.roleModel)
  }
}
