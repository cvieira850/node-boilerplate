import { DbAddRole } from './db-add-role'
import { mockAddRoleParams, throwError, mockRoleModel } from '@/domain/test'
import { AddRoleRepositorySpy, LoadRoleByNameRepositorySpy } from '@/data/test'

type SutTypes = {
  sut: DbAddRole
  addRoleRepositorySpy: AddRoleRepositorySpy
  loadRoleByNameRepositorySpy: LoadRoleByNameRepositorySpy
}

const makeSut = (): SutTypes => {
  const addRoleRepositorySpy = new AddRoleRepositorySpy()
  const loadRoleByNameRepositorySpy = new LoadRoleByNameRepositorySpy()
  const sut = new DbAddRole(addRoleRepositorySpy, loadRoleByNameRepositorySpy)
  return {
    sut,
    addRoleRepositorySpy,
    loadRoleByNameRepositorySpy
  }
}

describe('DbAddRole UseCase', () => {
  describe('AddRoleRepository', () => {
    test('Should call AddRoleRepository with correct values', async () => {
      const { sut, addRoleRepositorySpy } = makeSut()
      const addRoleParams = mockAddRoleParams()
      await sut.add(addRoleParams)
      expect(addRoleRepositorySpy.roleData).toBe(addRoleParams)
    })

    test('Should throw if AddRoleRepository throws', async () => {
      const { sut, addRoleRepositorySpy } = makeSut()
      jest.spyOn(addRoleRepositorySpy,'add').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddRoleParams())
      await expect(promise).rejects.toThrow()
    })

    test('Should return a role on success', async () => {
      const { sut } = makeSut()
      const role = await sut.add(mockAddRoleParams())
      expect(role).toEqual(mockRoleModel())
    })
  })

  describe('LoadRoleByNameRepository', () => {
    test('Should return null if LoadRoleByNameRepository not returns null', async () => {
      const { sut, loadRoleByNameRepositorySpy } = makeSut()
      loadRoleByNameRepositorySpy.result = mockRoleModel()
      const role = await sut.add(mockAddRoleParams())
      expect(role).toBeNull()
    })

    test('Should call LoadRoleByNameRepository with correct name', async () => {
      const { sut,loadRoleByNameRepositorySpy } = makeSut()
      await sut.add(mockAddRoleParams())
      expect(loadRoleByNameRepositorySpy.name).toBe('any_name')
    })
  })
})
