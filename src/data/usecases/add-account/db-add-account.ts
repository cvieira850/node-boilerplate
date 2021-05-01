import { AccountModel,AddAccount, AddAccountModel,Hash, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hash: Hash,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hash.hash(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({},accountData, { password: hashedPassword }))
    return account
  }
}
