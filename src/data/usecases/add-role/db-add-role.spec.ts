import { RoleModel } from '../../../domain/models/role'
import { AddRoleModel, AddRoleRepository } from './db-add-role-protocols'
import { DbAddRole } from './db-add-role'

const makeFakeRoleData = (): AddRoleModel => ({
  name: 'any_name'
})

const makeAddRoleRepository = (): AddRoleRepository => {
  class AddRoleRepositoryStub implements AddRoleRepository {
    async add (roleData: AddRoleModel): Promise<RoleModel> {
      return new Promise(resolve => resolve({ id: 'any_id', name: 'any_name' }))
    }
  }
  return new AddRoleRepositoryStub()
}

interface SutTypes {
  sut: DbAddRole
  addRoleRepositoryStub: AddRoleRepository
}

const makeSut = (): SutTypes => {
  const addRoleRepositoryStub = makeAddRoleRepository()
  const sut = new DbAddRole(addRoleRepositoryStub)
  return {
    sut,
    addRoleRepositoryStub
  }
}

describe('DbAddRole UseCase', () => {
  test('Should call AddRoleRepository with correct values', async () => {
    const { sut, addRoleRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addRoleRepositoryStub, 'add')
    await sut.add(makeFakeRoleData())
    expect(addSpy).toHaveBeenCalledWith(makeFakeRoleData())
  })

  test('Should throw if AddRoleRepository throws', async () => {
    const { sut, addRoleRepositoryStub } = makeSut()
    jest.spyOn(addRoleRepositoryStub,'add').mockResolvedValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const promise = sut.add(makeFakeRoleData())
    await expect(promise).rejects.toThrow()
  })
})
