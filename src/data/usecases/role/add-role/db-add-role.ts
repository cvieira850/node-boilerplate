import { RoleModel, AddRole, AddRoleModel, AddRoleRepository, LoadRoleByNameRepository } from './db-add-role-protocols'

export class DbAddRole implements AddRole {
  constructor (
    private readonly addRoleRepository: AddRoleRepository,
    private readonly loadRoleByNameRepository: LoadRoleByNameRepository
  ) {}

  async add (data: AddRoleModel): Promise<RoleModel> {
    const role = await this.loadRoleByNameRepository.loadByName(data.name)
    if (!role) {
      const newRole = await this.addRoleRepository.add(data)
      return newRole
    }
    return null
  }
}
