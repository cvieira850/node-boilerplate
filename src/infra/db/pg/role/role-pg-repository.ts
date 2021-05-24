
import { AddRoleRepository } from '@/data/protocols/db/role/add-role-repository'
import { LoadRoleByNameRepository } from '@/data/usecases/add-role/db-add-role-protocols'
import { LoadRoleByIdRepository } from '@/data/usecases/add-role-to-user/db-add-role-to-user-protocols'
import { AddRoleModel } from '@/domain/usecases/add-role'
import { RoleModel } from '@/domain/models/role'
import Role from '@/infra/db/pg/typeorm/entities/role'
import { getRepository } from 'typeorm'

export class RolePgRepository implements
AddRoleRepository,
LoadRoleByNameRepository,
LoadRoleByIdRepository {
  async add (roleData: AddRoleModel): Promise<RoleModel> {
    const roleRepository = getRepository(Role)
    const roleCreated = roleRepository.create(roleData)
    const role = await roleRepository.save(roleCreated)
    return role
  }

  async loadByName (name: string): Promise<RoleModel> {
    const userRepository = getRepository(Role)
    const role = await userRepository.findOne({ name })
    if (role) {
      return role
    }
    return null
  }

  async loadById (id: string): Promise<RoleModel> {
    const userRepository = getRepository(Role)
    const role = await userRepository.findOne(id)
    if (role) {
      return role
    }
    return null
  }
}
