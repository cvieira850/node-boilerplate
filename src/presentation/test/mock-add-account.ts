import { AccountModel } from '@/domain/models/account'
import { mockAccountModel } from '@/domain/test'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'

export class AddAccountSpy implements AddAccount {
  accountModel = mockAccountModel()
  accountData: AddAccountParams
  async add (accountData: AddAccountParams): Promise<AccountModel> {
    this.accountData = accountData
    return Promise.resolve(this.accountModel)
  }
}
