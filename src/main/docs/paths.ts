import {
  loadAccountByIdPath,
  loginPath,
  signUpPath,
  addRolePath,
  addRoleToUserPath
} from './paths/'

export default {
  '/login': loginPath,
  '/signup': signUpPath,
  '/users/{userId}': loadAccountByIdPath,
  '/users/role': addRoleToUserPath,
  '/roles': addRolePath
}
