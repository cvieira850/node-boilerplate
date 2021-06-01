import { AuthenticationModel } from '@/data/usecases/account/authentication/db-authentication-protocols'
import { AddRoleToUserParams } from '@/data/usecases/role/add-role-to-user/db-add-role-to-user-protocols'
import { AccountModel } from '@/domain/models/account'
import { AddAccountParams } from '@/domain/usecases/account/add-account'
import faker from 'faker'

export const mockAddAccountParams = (): AddAccountParams => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAddAccountWithTokenParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  access_token: 'any_token'
})

export const mockAccountModel = (): AccountModel => Object.assign({}, mockAddAccountParams(), { id: 'any_id' })

export const mockAuthentication = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAddRoleToUserParams = (): AddRoleToUserParams => ({
  userId: 'valid_user_id',
  roleId: 'valid_role_id'
})
