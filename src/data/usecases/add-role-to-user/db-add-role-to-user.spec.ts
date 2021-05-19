import { DbAddRoleToUser } from './db-add-role-to-user'
import { AddRoleToUserModel, AccountModel, AddRoleToUserRepository, LoadAccountByIdRepository } from './db-add-role-to-user-protocols'

const makeFakeAddRoleToUserData = (): AddRoleToUserModel => ({
  userId: 'valid_user_id',
  roleId: 'valid_role_id'
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_user_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password',
  role_id: 'valid_role_id'
})

const makeLoadAccountByIdRepositoryStub = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    async loadById (userId: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByIdRepositoryStub()
}

const makeAddRoleToUserRepository = (): AddRoleToUserRepository => {
  class AddRoleToUserRepositoryStub implements AddRoleToUserRepository {
    async addRoleToUser (data: AddRoleToUserModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new AddRoleToUserRepositoryStub()
}

interface SutTypes {
  sut: DbAddRoleToUser
  addRoleToUserRepositoryStub: AddRoleToUserRepository
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const addRoleToUserRepositoryStub = makeAddRoleToUserRepository()
  const loadAccountByIdRepositoryStub = makeLoadAccountByIdRepositoryStub()
  const sut = new DbAddRoleToUser(
    addRoleToUserRepositoryStub,
    loadAccountByIdRepositoryStub
  )
  return {
    sut,
    addRoleToUserRepositoryStub,
    loadAccountByIdRepositoryStub
  }
}

describe('DbAddRoleToUser UseCase', () => {
  test('Should call AddRoleToUserRepository with correct values', async () => {
    const { sut, addRoleToUserRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addRoleToUserRepositoryStub,'addRoleToUser')
    await sut.addRoleToUser(makeFakeAddRoleToUserData())
    expect(addSpy).toHaveBeenCalledWith(makeFakeAddRoleToUserData())
  })

  test('Should throw if AddRoleToUserRepository throws', async () => {
    const { sut, addRoleToUserRepositoryStub } = makeSut()
    jest.spyOn(addRoleToUserRepositoryStub,'addRoleToUser').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const promise = sut.addRoleToUser(makeFakeAddRoleToUserData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadAccountByIdRepository with correct value', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByIdRepositoryStub,'loadById')
    const { userId, roleId } = makeFakeAddRoleToUserData()
    await sut.addRoleToUser({ userId, roleId })
    expect(loadSpy).toHaveBeenCalledWith(userId)
  })

  test('Should return null if LoadAccountByIdRepository returns null', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByIdRepositoryStub,'loadById').mockReturnValueOnce(new Promise((resolve) => resolve(null)))
    const { userId, roleId } = makeFakeAddRoleToUserData()
    const account = await sut.addRoleToUser({ userId, roleId })
    expect(account).toBeNull()
  })

  test('Should throw if LoadAccountByIdRepository throws', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByIdRepositoryStub,'loadById').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const promise = sut.addRoleToUser(makeFakeAddRoleToUserData())
    await expect(promise).rejects.toThrow()
  })
})
