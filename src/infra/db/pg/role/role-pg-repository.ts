
import { AddRoleRepository } from '../../../../data/protocols/db/role/add-role-repository'
import { LoadRoleByNameRepository } from '../../../../data/usecases/add-role/db-add-role-protocols'
import { AddRoleModel } from '../../../../domain/usecases/add-role'
import { RoleModel } from '../../../../domain/models/role'
import Role from '../typeorm/entities/role'
import { getRepository } from 'typeorm'

export class RolePgRepository implements
AddRoleRepository, LoadRoleByNameRepository {
  async add (roleData: AddRoleModel): Promise<RoleModel> {
    const roleRepository = getRepository(Role)
    const roleCreated = roleRepository.create(roleData)
    const role = await roleRepository.save(roleCreated)
    return role
  }

  async loadByName (name: string): Promise<RoleModel> {
    const userRepository = getRepository(Role)
    const role = await userRepository.findOne({ name })
    return role
  }
}
