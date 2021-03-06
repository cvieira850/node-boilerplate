import {
  accountSchema,
  errorSchema,
  loginParamsSchema,
  loginSchema,
  roleSchema,
  signUpParamsSchema,
  addRoleParamsSchema,
  addRoleToUserParamsSchema,
  accountsSchema,
  updateAccountParamsSchema
} from './schemas/'

export default {
  account: accountSchema,
  accounts: accountsSchema,
  login: loginSchema,
  loginParams: loginParamsSchema,
  error: errorSchema,
  role: roleSchema,
  signupParams: signUpParamsSchema,
  addRoleParams: addRoleParamsSchema,
  addRoleToUserParams: addRoleToUserParamsSchema,
  updateAccountParams: updateAccountParamsSchema
}
