import { Authentication, AuthenticationModel } from '@/domain/usecases/account/authentication'

export const mockAuthentication = (): Authentication => {
  class AuthenticatioStub implements Authentication {
    async auth (authentication: AuthenticationModel): Promise<string> {
      return Promise.resolve('any_token')
    }
  }
  return new AuthenticatioStub()
}
