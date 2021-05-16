import { AddRoleRepository } from '../../protocols/db/role/db-add-role-repository'
import { RoleModel, AddRole, AddRoleModel } from './db-add-role-protocols'

export class DbAddRole implements AddRole {
  constructor (private readonly addRoleRepository: AddRoleRepository) {}
  async add (data: AddRoleModel): Promise<RoleModel> {
    await this.addRoleRepository.add(data)
    return new Promise(resolve => resolve(null))
  }
}
