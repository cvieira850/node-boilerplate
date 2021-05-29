import {
  accountSchema,
  errorSchema,
  loginParamsSchema,
  loginSchema,
  roleSchema,
  signUpParamsSchema,
  addRoleParamsSchema,
  addRoleToUserParamsSchema
} from './schemas/'

export default {
  account: accountSchema,
  login: loginSchema,
  loginParams: loginParamsSchema,
  error: errorSchema,
  role: roleSchema,
  signupParams: signUpParamsSchema,
  addRoleParams: addRoleParamsSchema,
  addRoleToUserParams: addRoleToUserParamsSchema
}
