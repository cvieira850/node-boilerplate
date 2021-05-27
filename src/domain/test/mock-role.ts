import { RoleModel } from '@/domain/models/role'
import { AddRoleParams } from '@/domain/usecases/role/add-role'

export const mockAddRoleParams = (): AddRoleParams => ({
  name: 'any_name'
})

export const mockRoleModel = (): RoleModel => Object.assign({}, mockAddRoleParams(), { id: 'any_id' })
