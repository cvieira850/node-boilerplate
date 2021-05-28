import { AddRoleRepository, LoadRoleByNameRepository } from './db-add-role-protocols'
import { DbAddRole } from './db-add-role'
import { mockAddRoleParams, throwError, mockRoleModel } from '@/domain/test'
import { mockAddRoleRepository, mockLoadRoleByNameRepository } from '@/data/test'

type SutTypes = {
  sut: DbAddRole
  addRoleRepositoryStub: AddRoleRepository
  loadRoleByNameRepositoryStub: LoadRoleByNameRepository
}

const makeSut = (): SutTypes => {
  const addRoleRepositoryStub = mockAddRoleRepository()
  const loadRoleByNameRepositoryStub = mockLoadRoleByNameRepository()
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
    await sut.add(mockAddRoleParams())
    expect(addSpy).toHaveBeenCalledWith(mockAddRoleParams())
  })

  test('Should throw if AddRoleRepository throws', async () => {
    const { sut, addRoleRepositoryStub } = makeSut()
    jest.spyOn(addRoleRepositoryStub,'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddRoleParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a role on success', async () => {
    const { sut } = makeSut()
    const role = await sut.add(mockAddRoleParams())
    expect(role).toEqual(mockRoleModel())
  })

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
