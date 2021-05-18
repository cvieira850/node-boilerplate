export class InvalidRoleOrUserError extends Error {
  constructor () {
    super('The received userId or roleId is already invalid')
    this.name = 'InvalidRoleOrUserError'
  }
}
