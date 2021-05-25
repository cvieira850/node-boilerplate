export class RoleIsAlreadyRegisteredError extends Error {
  constructor () {
    super('The received role is already registered')
    this.name = 'MissingParamError'
  }
}
