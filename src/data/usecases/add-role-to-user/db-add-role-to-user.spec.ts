import { DbAddRoleToUser } from './db-add-role-to-user'
import { AddRoleToUserModel, AccountModel, AddRoleToUserRepository } from './db-add-role-to-user-protocols'

describe('DbAddRoleToUser UseCase', () => {
  test('Should call AddRoleToUserRepository with correct values', async () => {
    class AddRoleToUserRepositoryStub implements AddRoleToUserRepository {
      async addRoleToUser (data: AddRoleToUserModel): Promise<AccountModel> {
        return new Promise(resolve => resolve({
          id: 'valid_user_id',
          name: 'valid_name',
          email: 'valid_email@mail.com',
          password: 'hashed_password',
          role_id: 'valid_role_id'
        }))
      }
    }
    const addRoleToUserRepositoryStub = new AddRoleToUserRepositoryStub()
    const sut = new DbAddRoleToUser(addRoleToUserRepositoryStub)
    const addSpy = jest.spyOn(addRoleToUserRepositoryStub,'addRoleToUser')
    await sut.addRoleToUser({
      userId: 'valid_user_id',
      roleId: 'valid_role_id'
    })
    expect(addSpy).toHaveBeenCalledWith({
      userId: 'valid_user_id',
      roleId: 'valid_role_id'
    })
  })
})
