import { AccountModel } from '@/domain/models/account'
import { mockAccountModel } from '@/domain/test'
import { LoadAccountById } from '@/domain/usecases/account/load-account-by-id'
export class LoadAccountByIdSpy implements LoadAccountById {
  accountModel = mockAccountModel()
  id: string

  async loadById (id: string): Promise<AccountModel> {
    this.id = id
    return Promise.resolve(this.accountModel)
  }
}
