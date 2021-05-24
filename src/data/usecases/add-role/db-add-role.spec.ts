import { AddRoleModel, AddRoleRepository, RoleModel, LoadRoleByNameRepository } from './db-add-role-protocols'
import { DbAddRole } from './db-add-role'

const makeFakeRoleData = (): AddRoleModel => ({
  name: 'any_name'
})

const makeFakeRole = (): RoleModel => ({
  id: 'any_id',
  name: 'any_name'
})

const makeAddRoleRepository = (): AddRoleRepository => {
  class AddRoleRepositoryStub implements AddRoleRepository {
    async add (roleData: AddRoleModel): Promise<RoleModel> {
      return new Promise(resolve => resolve(makeFakeRole()))
    }
  }
  return new AddRoleRepositoryStub()
}

const makeLoadRoleByNameRepository = (): LoadRoleByNameRepository => {
  class LoadRoleByNameRepositoryStub implements LoadRoleByNameRepository {
    async loadByName (name: string): Promise<RoleModel> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new LoadRoleByNameRepositoryStub()
}

interface SutTypes {
  sut: DbAddRole
  addRoleRepositoryStub: AddRoleRepository
  loadRoleByNameRepositoryStub: LoadRoleByNameRepository
}

const makeSut = (): SutTypes => {
  const addRoleRepositoryStub = makeAddRoleRepository()
  const loadRoleByNameRepositoryStub = makeLoadRoleByNameRepository()
  const sut = new DbAddRole(addRoleRepositoryStub, loadRoleByNameRepositoryStub)
  return {
    sut,
    addRoleRepositoryStub,
    loadRoleByNameRepositoryStub
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
    jest.spyOn(addRoleRepositoryStub,'add').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const promise = sut.add(makeFakeRoleData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a role on success', async () => {
    const { sut } = makeSut()
    const role = await sut.add(makeFakeRoleData())
    expect(role).toEqual(makeFakeRole())
  })

  test('Should return null if LoadRoleByNameRepository not returns null', async () => {
    const { sut, loadRoleByNameRepositoryStub } = makeSut()
    jest.spyOn(loadRoleByNameRepositoryStub,'loadByName').mockReturnValueOnce(new Promise(resolve => resolve(makeFakeRole())))
    const role = await sut.add(makeFakeRoleData())
    expect(role).toBeNull()
  })

  test('Should call LoadRoleByNameRepository with correct name', async () => {
    const { sut,loadRoleByNameRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadRoleByNameRepositoryStub,'loadByName')
    await sut.add(makeFakeRoleData())
    expect(loadSpy).toHaveBeenCalledWith('any_name')
  })
})
