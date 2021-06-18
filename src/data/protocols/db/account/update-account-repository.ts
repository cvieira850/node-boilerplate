import { UpdateAccountParams } from '@/domain/usecases/account/update-account'
import { AccountModel } from '@/domain/models/account'
export interface UpdateAccountRepository {
  update: (accountData: UpdateAccountParams) => Promise<AccountModel>
}
