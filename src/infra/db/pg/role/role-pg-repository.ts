
import { AddRoleRepository } from '../../../../data/protocols/db/role/add-role-repository'
import { AddRoleModel } from '../../../../domain/usecases/add-role'
import { RoleModel } from '../../../../domain/models/role'
import Role from '../typeorm/entities/role'
import { getRepository } from 'typeorm'

export class RolePgRepository implements
AddRoleRepository {
  async add (roleData: AddRoleModel): Promise<RoleModel> {
    const roleRepository = getRepository(Role)
    const roleCreated = roleRepository.create(roleData)
    const role = await roleRepository.save(roleCreated)
    return role
  }
}
