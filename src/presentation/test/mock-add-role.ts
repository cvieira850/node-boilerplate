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
