import { DbAddRoleToUser } from './db-add-role-to-user'
import { throwError, mockAddRoleToUserParams } from '@/domain/test'
import { AddRoleToUserRepositorySpy, LoadAccountByIdRepositorySpy, LoadRoleByIdRepositorySpy } from '@/data/test'

type SutTypes = {
  sut: DbAddRoleToUser
  addRoleToUserRepositorySpy: AddRoleToUserRepositorySpy
  loadAccountByIdRepositorySpy: LoadAccountByIdRepositorySpy
  loadRoleByIdRepositorySpy: LoadRoleByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const addRoleToUserRepositorySpy = new AddRoleToUserRepositorySpy()
  const loadAccountByIdRepositorySpy = new LoadAccountByIdRepositorySpy()
  const loadRoleByIdRepositorySpy = new LoadRoleByIdRepositorySpy()
  const sut = new DbAddRoleToUser(
    addRoleToUserRepositorySpy,
    loadAccountByIdRepositorySpy,
    loadRoleByIdRepositorySpy
  )
  return {
    sut,
    addRoleToUserRepositorySpy,
    loadAccountByIdRepositorySpy,
    loadRoleByIdRepositorySpy
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
      loadAccountByIdRepositorySpy.accountModel = null
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
      const { sut, loadRoleByIdRepositorySpy } = makeSut()
      const { userId, roleId } = mockAddRoleToUserParams()
      await sut.addRoleToUser({ userId, roleId })
      expect(loadRoleByIdRepositorySpy.roleId).toBe(roleId)
    })

    test('Should return null if LoadRoleByIdRepository returns null', async () => {
      const { sut, loadRoleByIdRepositorySpy } = makeSut()
      loadRoleByIdRepositorySpy.roleModel = null
      const account = await sut.addRoleToUser(mockAddRoleToUserParams())
      expect(account).toBeNull()
    })

    test('Should throw if LoadRoleByIdRepository throws', async () => {
      const { sut, loadRoleByIdRepositorySpy } = makeSut()
      jest.spyOn(loadRoleByIdRepositorySpy,'loadById').mockImplementationOnce(throwError)
      const promise = sut.addRoleToUser(mockAddRoleToUserParams())
      await expect(promise).rejects.toThrow()
    })
  })

  test('Should return an account on success', async () => {
    const { sut, addRoleToUserRepositorySpy } = makeSut()
    const account = await sut.addRoleToUser(mockAddRoleToUserParams())
    expect(account).toEqual(addRoleToUserRepositorySpy.accountModel)
  })
})
