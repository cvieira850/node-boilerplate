import { AccountModel } from '@/domain/models/account'
import { mockAccountModel } from '@/domain/test'
import { UpdateAccount, UpdateAccountParams } from '@/domain/usecases/account/update-account'

export class UpdateAccountSpy implements UpdateAccount {
  accountModel = mockAccountModel()
  accountData: UpdateAccountParams
  async update (accountData: UpdateAccountParams): Promise<AccountModel> {
    this.accountData = accountData
    return Promise.resolve(this.accountModel)
  }
}
