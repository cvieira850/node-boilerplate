import {
  loadAccountByIdPath,
  loginPath,
  signUpPath,
  addRolePath,
  addRoleToUserPath,
  loadAccountsPath
} from './paths/'

export default {
  '/login': loginPath,
  '/signup': signUpPath,
  '/users': loadAccountsPath,
  '/users/{userId}': loadAccountByIdPath,
  '/users/role': addRoleToUserPath,
  '/roles': addRolePath
}
