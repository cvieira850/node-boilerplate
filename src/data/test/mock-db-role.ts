import { RoleModel } from '@/domain/models/role'
import { AddRoleParams } from '@/domain/usecases/role/add-role'
import { mockRoleModel } from '@/domain/test'
import { AddRoleRepository } from '@/data/protocols/db/role/add-role-repository'
import { LoadRoleByIdRepository } from '@/data/protocols/db/role/load-role-by-id-repository'
import { LoadRoleByNameRepository } from '../protocols/db/role/load-role-by-name-repository'

export class AddRoleRepositorySpy implements AddRoleRepository {
  roleModel = mockRoleModel()
  roleData: AddRoleParams

  async add (roleData: AddRoleParams): Promise<RoleModel> {
    this.roleData = roleData
    return Promise.resolve(this.roleModel)
  }
}

export class LoadRoleByIdRepositorySpy implements LoadRoleByIdRepository {
  roleModel= mockRoleModel()
  roleId: string

  async loadById (roleId: string): Promise<RoleModel> {
    this.roleId = roleId
    return Promise.resolve(this.roleModel)
  }
}

export class LoadRoleByNameRepositorySpy implements LoadRoleByNameRepository {
  result = null
  name: string
  async loadByName (name: string): Promise<RoleModel> {
    this.name = name
    return Promise.resolve(this.result)
  }
}
