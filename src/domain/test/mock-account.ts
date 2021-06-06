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
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  access_token: faker.datatype.uuid()
})

export const mockAccountModel = (): AccountModel => Object.assign({}, mockAddAccountParams(), { id: faker.datatype.uuid() })

export const mockAccountsModel = (): AccountModel[] => ([
  mockAccountModel(),
  mockAccountModel()
])

export const mockAuthentication = (): AuthenticationModel => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAddRoleToUserParams = (): AddRoleToUserParams => ({
  userId: faker.datatype.uuid(),
  roleId: faker.datatype.uuid()
})
