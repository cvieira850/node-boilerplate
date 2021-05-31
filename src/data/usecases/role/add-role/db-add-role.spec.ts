import { LoadRoleByNameRepository } from './db-add-role-protocols'
import { DbAddRole } from './db-add-role'
import { mockAddRoleParams, throwError, mockRoleModel } from '@/domain/test'
import { AddRoleRepositorySpy, mockLoadRoleByNameRepository } from '@/data/test'

type SutTypes = {
  sut: DbAddRole
  addRoleRepositorySpy: AddRoleRepositorySpy
  loadRoleByNameRepositoryStub: LoadRoleByNameRepository
}

const makeSut = (): SutTypes => {
  const addRoleRepositorySpy = new AddRoleRepositorySpy()
  const loadRoleByNameRepositoryStub = mockLoadRoleByNameRepository()
  const sut = new DbAddRole(addRoleRepositorySpy, loadRoleByNameRepositoryStub)
  return {
    sut,
    addRoleRepositorySpy,
    loadRoleByNameRepositoryStub
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
      const { sut, loadRoleByNameRepositoryStub } = makeSut()
      jest.spyOn(loadRoleByNameRepositoryStub,'loadByName').mockReturnValueOnce(Promise.resolve(mockRoleModel()))
      const role = await sut.add(mockAddRoleParams())
      expect(role).toBeNull()
    })

    test('Should call LoadRoleByNameRepository with correct name', async () => {
      const { sut,loadRoleByNameRepositoryStub } = makeSut()
      const loadSpy = jest.spyOn(loadRoleByNameRepositoryStub,'loadByName')
      await sut.add(mockAddRoleParams())
      expect(loadSpy).toHaveBeenCalledWith('any_name')
    })
  })
})
