import { DbAddRoleToUser } from './db-add-role-to-user'
import {
  LoadRoleByIdRepository
} from './db-add-role-to-user-protocols'
import { throwError, mockAccountModel, mockAddRoleToUserParams } from '@/domain/test'
import { AddRoleToUserRepositorySpy, LoadAccountByIdRepositorySpy, mockLoadRoleByIdRepository } from '@/data/test'

type SutTypes = {
  sut: DbAddRoleToUser
  addRoleToUserRepositorySpy: AddRoleToUserRepositorySpy
  loadAccountByIdRepositorySpy: LoadAccountByIdRepositorySpy
  loadRoleByIdRepositoryStub: LoadRoleByIdRepository
}

const makeSut = (): SutTypes => {
  const addRoleToUserRepositorySpy = new AddRoleToUserRepositorySpy()
  const loadAccountByIdRepositorySpy = new LoadAccountByIdRepositorySpy()
  const loadRoleByIdRepositoryStub = mockLoadRoleByIdRepository()
  const sut = new DbAddRoleToUser(
    addRoleToUserRepositorySpy,
    loadAccountByIdRepositorySpy,
    loadRoleByIdRepositoryStub
  )
  return {
    sut,
    addRoleToUserRepositorySpy,
    loadAccountByIdRepositorySpy,
    loadRoleByIdRepositoryStub
  }
}

describe('DbAddRoleToUser UseCase', () => {
  describe('AddRoleToUserRepository', () => {
    test('Should call AddRoleToUserRepository with correct values', async () => {
      const { sut, addRoleToUserRepositorySpy } = makeSut()
      const addRoleToUserParams = mockAddRoleToUserParams()
      await sut.addRoleToUser(addRoleToUserParams)
      expect(addRoleToUserRepositorySpy.data).toBe(addRoleToUserParams)
    })

    test('Should throw if AddRoleToUserRepository throws', async () => {
      const { sut, addRoleToUserRepositorySpy } = makeSut()
      jest.spyOn(addRoleToUserRepositorySpy,'addRoleToUser').mockImplementationOnce(throwError)
      const promise = sut.addRoleToUser(mockAddRoleToUserParams())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('LoadAccountByIdRepository', () => {
    test('Should call LoadAccountByIdRepository with correct value', async () => {
      const { sut, loadAccountByIdRepositorySpy } = makeSut()
      const { userId, roleId } = mockAddRoleToUserParams()
      await sut.addRoleToUser({ userId, roleId })
      expect(loadAccountByIdRepositorySpy.userId).toBe(userId)
    })

    test('Should return null if LoadAccountByIdRepository returns null', async () => {
      const { sut, loadAccountByIdRepositorySpy } = makeSut()
      jest.spyOn(loadAccountByIdRepositorySpy,'loadById').mockReturnValueOnce(Promise.resolve(null))
      const account = await sut.addRoleToUser(mockAddRoleToUserParams())
      expect(account).toBeNull()
    })

    test('Should throw if LoadAccountByIdRepository throws', async () => {
      const { sut, loadAccountByIdRepositorySpy } = makeSut()
      jest.spyOn(loadAccountByIdRepositorySpy,'loadById').mockImplementationOnce(throwError)
      const promise = sut.addRoleToUser(mockAddRoleToUserParams())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('LoadRoleByIdRepository', () => {
    test('Should call LoadRoleByIdRepository with correct value', async () => {
      const { sut, loadRoleByIdRepositoryStub } = makeSut()
      const loadSpy = jest.spyOn(loadRoleByIdRepositoryStub,'loadById')
      const { userId, roleId } = mockAddRoleToUserParams()
      await sut.addRoleToUser({ userId, roleId })
      expect(loadSpy).toHaveBeenCalledWith(roleId)
    })

    test('Should return null if LoadRoleByIdRepository returns null', async () => {
      const { sut, loadRoleByIdRepositoryStub } = makeSut()
      jest.spyOn(loadRoleByIdRepositoryStub,'loadById').mockReturnValueOnce(Promise.resolve(null))
      const account = await sut.addRoleToUser(mockAddRoleToUserParams())
      expect(account).toBeNull()
    })

    test('Should throw if LoadRoleByIdRepository throws', async () => {
      const { sut, loadRoleByIdRepositoryStub } = makeSut()
      jest.spyOn(loadRoleByIdRepositoryStub,'loadById').mockImplementationOnce(throwError)
      const promise = sut.addRoleToUser(mockAddRoleToUserParams())
      await expect(promise).rejects.toThrow()
    })
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.addRoleToUser(mockAddRoleToUserParams())
    expect(account).toEqual(mockAccountModel())
  })
})
