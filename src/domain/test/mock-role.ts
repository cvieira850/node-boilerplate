import { RoleModel } from '@/domain/models/role'
import { AddRoleParams } from '@/domain/usecases/role/add-role'
import faker from 'faker'

export const mockAddRoleParams = (): AddRoleParams => ({
  name: faker.name.findName()
})

export const mockRoleModel = (): RoleModel => Object.assign({}, mockAddRoleParams(), { id: faker.datatype.uuid() })
