import { AddRoleToUser, AddRoleToUserModel, AccountModel, AddRoleToUserRepository, LoadAccountByIdRepository } from './db-add-role-to-user-protocols'

export class DbAddRoleToUser implements AddRoleToUser {
  constructor (
    private readonly addRoleToUserRepository: AddRoleToUserRepository,
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository
  ) {}

  async addRoleToUser (data: AddRoleToUserModel): Promise<AccountModel> {
    const { userId } = data
    await this.loadAccountByIdRepository.loadById(userId)
    await this.addRoleToUserRepository.addRoleToUser(data)
    return new Promise(resolve => resolve(null))
  }
}
