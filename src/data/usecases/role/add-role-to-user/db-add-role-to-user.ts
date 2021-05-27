import {
  AddRoleToUser,
  AddRoleToUserParams,
  AccountModel,
  AddRoleToUserRepository,
  LoadAccountByIdRepository,
  LoadRoleByIdRepository
} from './db-add-role-to-user-protocols'

export class DbAddRoleToUser implements AddRoleToUser {
  constructor (
    private readonly addRoleToUserRepository: AddRoleToUserRepository,
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly loadRoleByIdRepository: LoadRoleByIdRepository
  ) {}

  async addRoleToUser (data: AddRoleToUserParams): Promise<AccountModel> {
    const { userId, roleId } = data
    const account = await this.loadAccountByIdRepository.loadById(userId)
    const role = await this.loadRoleByIdRepository.loadById(roleId)
    if (account && role) {
      const updatedAccount = await this.addRoleToUserRepository.addRoleToUser(data)
      return updatedAccount
    }
    return null
  }
}
