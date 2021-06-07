import { AccountModel } from '@/domain/models/account'
export interface LoadAccountsRepository {
  load: () => Promise<AccountModel[]>
}
