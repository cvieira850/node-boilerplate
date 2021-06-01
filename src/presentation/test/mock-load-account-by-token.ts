import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { AccountModel } from '@/domain/models/account'
import { mockAccountModel } from '@/domain/test'

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accountModel = mockAccountModel()
  accessToken: string
  async loadByToken (accessToken: string): Promise<AccountModel> {
    this.accessToken = accessToken
    return Promise.resolve(this.accountModel)
  }
}
