import { AccountModel } from '@/domain/models/account'

export type LoadAccountById = {
  loadById: (id: string) => Promise<AccountModel>
}
