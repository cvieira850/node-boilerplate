import { AccountModel } from '../../../domain/models/account'
import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import { Decrypter } from '../../protocols/cryptography/decrypter'
import { LoadRoleByIdRepository } from '../../protocols/db/role/load-role-by-id-repository'
import { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
    private readonly loadRoleByIdRepository: LoadRoleByIdRepository
  ) {}

  async loadByToken (accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(token)
      if (account) {
        if (role) {
          if (account.role_id) {
            const searchedRole = await this.loadRoleByIdRepository.loadById(account.role_id)
            if (searchedRole?.name === role) {
              return account
            }
          }
          return null
        }
        return account
      }
    }
    return null
  }
}
