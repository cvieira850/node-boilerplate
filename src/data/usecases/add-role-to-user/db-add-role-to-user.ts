import { AddRoleToUser, AddRoleToUserModel, AccountModel, AddRoleToUserRepository } from './db-add-role-to-user-protocols'

export class DbAddRoleToUser implements AddRoleToUser {
  constructor (private readonly addRoleToUserRepository: AddRoleToUserRepository) {}
  async addRoleToUser (data: AddRoleToUserModel): Promise<AccountModel> {
    await this.addRoleToUserRepository.addRoleToUser(data)
    return new Promise(resolve => resolve(null))
  }
}
