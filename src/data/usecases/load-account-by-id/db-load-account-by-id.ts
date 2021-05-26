import { LoadAccountByIdRepository } from '@/data/protocols/db/account/load-account-by-id-repository'
import { AccountModel } from '@/domain/models/account'
import { LoadAccountById } from '@/domain/usecases/load-account-by-id'

export class DbLoadAccountById implements LoadAccountById {
  constructor (private readonly loadAccountByIdRepository: LoadAccountByIdRepository) {}
  async loadById (userId: string): Promise<AccountModel> {
    const account = await this.loadAccountByIdRepository.loadById(userId)
    return account
  }
}
