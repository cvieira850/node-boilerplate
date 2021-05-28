import { AccountModel } from '@/domain/models/account'
import { mockAccountModel } from '@/domain/test'
import { LoadAccountById } from '@/domain/usecases/account/load-account-by-id'

export const mockLoadAccountById = (): LoadAccountById => {
  class LoadAccountByIdStub implements LoadAccountById {
    async loadById (id: string): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel())
    }
  }
  return new LoadAccountByIdStub()
}
