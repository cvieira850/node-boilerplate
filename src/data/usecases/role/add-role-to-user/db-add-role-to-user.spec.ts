import { DbAddRoleToUser } from './db-add-role-to-user'
import {
  AddRoleToUserRepository,
  LoadAccountByIdRepository,
  LoadRoleByIdRepository
} from './db-add-role-to-user-protocols'
import { throwError, mockAccountModel, mockAddRoleToUserParams } from '@/domain/test'
import { mockAddRoleToUserRepository, mockLoadAccountByIdRepository, mockLoadRoleByIdRepository } from '@/data/test'

type SutTypes = {
  sut: DbAddRoleToUser
  addRoleToUserRepositoryStub: AddRoleToUserRepository
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
  loadRoleByIdRepositoryStub: LoadRoleByIdRepository
}

const makeSut = (): SutTypes => {
  const addRoleToUserRepositoryStub = mockAddRoleToUserRepository()
  const loadAccountByIdRepositoryStub = mockLoadAccountByIdRepository()
  const loadRoleByIdRepositoryStub = mockLoadRoleByIdRepository()
  const sut = new DbAddRoleToUser(
    addRoleToUserRepositoryStub,
    loadAccountByIdRepositoryStub,
    loadRoleByIdRepositoryStub
  )
  return {
    sut,
    addRoleToUserRepositoryStub,
    loadAccountByIdRepositoryStub,
    loadRoleByIdRepositoryStub
  }
}

describe('DbAddRoleToUser UseCase', () => {
  test('Should call AddRoleToUserRepository with correct values', async () => {
    const { sut, addRoleToUserRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addRoleToUserRepositoryStub,'addRoleToUser')
    await sut.addRoleToUser(mockAddRoleToUserParams())
    expect(addSpy).toHaveBeenCalledWith(mockAddRoleToUserParams())
  })

  test('Should throw if AddRoleToUserRepository throws', async () => {
    const { sut, addRoleToUserRepositoryStub } = makeSut()
    jest.spyOn(addRoleToUserRepositoryStub,'addRoleToUser').mockImplementationOnce(throwError)
    const promise = sut.addRoleToUser(mockAddRoleToUserParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadAccountByIdRepository with correct value', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByIdRepositoryStub,'loadById')
    const { userId, roleId } = mockAddRoleToUserParams()
    await sut.addRoleToUser({ userId, roleId })
    expect(loadSpy).toHaveBeenCalledWith(userId)
  })

  test('Should return null if LoadAccountByIdRepository returns null', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByIdRepositoryStub,'loadById').mockReturnValueOnce(new Promise((resolve) => resolve(null)))
    const account = await sut.addRoleToUser(mockAddRoleToUserParams())
    expect(account).toBeNull()
  })

  test('Should throw if LoadAccountByIdRepository throws', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByIdRepositoryStub,'loadById').mockImplementationOnce(throwError)
    const promise = sut.addRoleToUser(mockAddRoleToUserParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadRoleByIdRepository with correct value', async () => {
    const { sut, loadRoleByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadRoleByIdRepositoryStub,'loadById')
    const { userId, roleId } = mockAddRoleToUserParams()
    await sut.addRoleToUser({ userId, roleId })
    expect(loadSpy).toHaveBeenCalledWith(roleId)
  })

  test('Should return null if LoadRoleByIdRepository returns null', async () => {
    const { sut, loadRoleByIdRepositoryStub } = makeSut()
    jest.spyOn(loadRoleByIdRepositoryStub,'loadById').mockReturnValueOnce(new Promise((resolve) => resolve(null)))
    const account = await sut.addRoleToUser(mockAddRoleToUserParams())
    expect(account).toBeNull()
  })

  test('Should throw if LoadRoleByIdRepository throws', async () => {
    const { sut, loadRoleByIdRepositoryStub } = makeSut()
    jest.spyOn(loadRoleByIdRepositoryStub,'loadById').mockImplementationOnce(throwError)
    const promise = sut.addRoleToUser(mockAddRoleToUserParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.addRoleToUser(mockAddRoleToUserParams())
    expect(account).toEqual(mockAccountModel())
  })
})
