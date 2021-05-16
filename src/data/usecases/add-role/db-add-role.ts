import { RoleModel, AddRole, AddRoleModel, AddRoleRepository } from './db-add-role-protocols'

export class DbAddRole implements AddRole {
  constructor (private readonly addRoleRepository: AddRoleRepository) {}
  async add (data: AddRoleModel): Promise<RoleModel> {
    const role = await this.addRoleRepository.add(data)
    return role
  }
}
