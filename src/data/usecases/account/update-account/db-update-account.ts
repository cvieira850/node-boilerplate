import { AccountModel, UpdateAccount, UpdateAccountParams, UpdateAccountRepository } from './db-update-account-protocols'

export class DbUpdateAccount implements UpdateAccount {
  constructor (private readonly updateAccountRepository: UpdateAccountRepository) {}
  async update (account: UpdateAccountParams): Promise<AccountModel> {
    const updatedAccount = await this.updateAccountRepository.update(account)
    return updatedAccount
  }
}
