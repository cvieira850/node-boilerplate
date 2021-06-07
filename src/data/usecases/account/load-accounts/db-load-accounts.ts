import { LoadAccountsRepository } from '@/data/protocols/db/account/load-accounts-repository'
import { LoadAccounts } from '@/domain/usecases/account/load-accounts'
import { AccountModel } from './db-load-accounts-protocols'

export class DbLoadAccounts implements LoadAccounts {
  constructor (private readonly loadAccountsRepository: LoadAccountsRepository) {}
  async load (): Promise<AccountModel[]> {
    const accounts = await this.loadAccountsRepository.load()
    return accounts
  }
}
