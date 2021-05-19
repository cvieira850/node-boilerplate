import { AccountModel } from '../../../../domain/models/account'
export interface LoadAccountByIdRepository {
  loadById: (userId: string) => Promise<AccountModel>
}
