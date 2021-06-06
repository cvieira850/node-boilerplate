import { AccountModel } from '@/domain/models/account'

export type LoadAccounts = {
  load: () => Promise<AccountModel[]>
}
