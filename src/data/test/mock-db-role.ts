import { RoleModel } from '@/domain/models/role'
import { AddRoleParams } from '@/domain/usecases/role/add-role'
import { mockRoleModel } from '@/domain/test'
import { AddRoleRepository } from '@/data/protocols/db/role/add-role-repository'
import { LoadRoleByIdRepository } from '@/data/protocols/db/role/load-role-by-id-repository'
import { LoadRoleByNameRepository } from '../protocols/db/role/load-role-by-name-repository'

export const mockAddRoleRepository = (): AddRoleRepository => {
  class AddRoleRepositoryStub implements AddRoleRepository {
    async add (roleData: AddRoleParams): Promise<RoleModel> {
      return new Promise(resolve => resolve(mockRoleModel()))
    }
  }
  return new AddRoleRepositoryStub()
}

export const mockLoadRoleByIdRepository = (): LoadRoleByIdRepository => {
  class LoadRoleByIdRepositoryStub implements LoadRoleByIdRepository {
    async loadById (roleId: string): Promise<RoleModel> {
      return new Promise(resolve => resolve(mockRoleModel()))
    }
  }
  return new LoadRoleByIdRepositoryStub()
}

export const mockLoadRoleByNameRepository = (): LoadRoleByNameRepository => {
  class LoadRoleByNameRepositoryStub implements LoadRoleByNameRepository {
    async loadByName (name: string): Promise<RoleModel> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new LoadRoleByNameRepositoryStub()
}
