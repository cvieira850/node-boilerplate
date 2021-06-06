import { AccountModel } from '@/domain/models/account'
import { mockAccountsModel } from '@/domain/test'
import { LoadAccounts } from '@/domain/usecases/account/load-accounts'

export class LoadAccountsSpy implements LoadAccounts {
  accountsModel= mockAccountsModel()
  async load (): Promise<AccountModel[]> {
    return Promise.resolve(this.accountsModel)
  }
}
