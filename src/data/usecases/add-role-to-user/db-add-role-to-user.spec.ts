import { DbAddRoleToUser } from './db-add-role-to-user'
import { AddRoleToUserModel, AccountModel, AddRoleToUserRepository } from './db-add-role-to-user-protocols'

const makeAddRoleToUserData = (): AddRoleToUserModel => ({
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
}

const makeSut = (): SutTypes => {
  const addRoleToUserRepositoryStub = makeAddRoleToUserRepository()
  const sut = new DbAddRoleToUser(addRoleToUserRepositoryStub)
  return {
    sut,
    addRoleToUserRepositoryStub
  }
}

describe('DbAddRoleToUser UseCase', () => {
  test('Should call AddRoleToUserRepository with correct values', async () => {
    const { sut, addRoleToUserRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addRoleToUserRepositoryStub,'addRoleToUser')
    await sut.addRoleToUser(makeAddRoleToUserData())
    expect(addSpy).toHaveBeenCalledWith(makeAddRoleToUserData())
  })

  test('Should throw if AddRoleToUserRepository throws', async () => {
    const { sut, addRoleToUserRepositoryStub } = makeSut()
    jest.spyOn(addRoleToUserRepositoryStub,'addRoleToUser').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const promise = sut.addRoleToUser(makeAddRoleToUserData())
    await expect(promise).rejects.toThrow()
  })
})
