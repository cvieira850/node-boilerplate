import { RoleModel } from '../../../domain/models/role'
import { AddRoleModel } from '../../../domain/usecases/add-role'
import { AddRoleRepository } from '../../protocols/db/role/db-add-role-repository'
import { DbAddRole } from './db-add-role'

const makeFakeRoleData = (): AddRoleModel => ({
  name: 'any_name'
})

describe('DbAddRole UseCase', () => {
  test('Should call AddRoleRepository with correct values', async () => {
    class AddRoleRepositoryStub implements AddRoleRepository {
      async add (roleData: AddRoleModel): Promise<RoleModel> {
        return new Promise(resolve => resolve({ id: 'any_id', name: 'any_name' }))
      }
    }
    const addRoleRepositoryStub = new AddRoleRepositoryStub()
    const addSpy = jest.spyOn(addRoleRepositoryStub, 'add')
    const sut = new DbAddRole(addRoleRepositoryStub)
    await sut.add(makeFakeRoleData())
    expect(addSpy).toHaveBeenCalledWith(makeFakeRoleData())
  })
})
