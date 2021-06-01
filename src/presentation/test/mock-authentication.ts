import { Authentication, AuthenticationModel } from '@/domain/usecases/account/authentication'
import faker from 'faker'

export class AuthenticationSpy implements Authentication {
  token = faker.datatype.uuid()
  authentication: AuthenticationModel

  async auth (authentication: AuthenticationModel): Promise<string> {
    this.authentication = authentication
    return Promise.resolve(this.token)
  }
}
