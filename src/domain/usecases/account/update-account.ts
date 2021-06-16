import { AccountModel } from '@/domain/models/account'

export type UpdateAccountParams = Omit<AccountModel, 'id'| 'password'>

export interface UpdateAccount {
  update: (account: UpdateAccountParams) => Promise<AccountModel>
}
