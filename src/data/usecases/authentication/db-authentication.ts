import {
  Authentication,
  AuthenticationModel,
  HashComparer,
  Encrypt,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypt: Encrypt,
    private readonly updateAcessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.comparer(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypt.encrypt(account.id)
        await this.updateAcessTokenRepository.update(account.id,accessToken)
        return accessToken
      }
    }
    return null
  }
}
