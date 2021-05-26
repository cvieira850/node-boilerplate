import { LoadAccountByIdRepository, AccountModel, LoadAccountById } from './db-load-account-by-id-protocols'

export class DbLoadAccountById implements LoadAccountById {
  constructor (private readonly loadAccountByIdRepository: LoadAccountByIdRepository) {}
  async loadById (userId: string): Promise<AccountModel> {
    const account = await this.loadAccountByIdRepository.loadById(userId)
    return account
  }
}
