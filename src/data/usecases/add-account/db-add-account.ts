import { AccountModel,AddAccount, AddAccountModel,Hash, AddAccountRepository, LoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hash: Hash,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    const hashedPassword = await this.hash.hash(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({},accountData, { password: hashedPassword }))
    return account
  }
}
