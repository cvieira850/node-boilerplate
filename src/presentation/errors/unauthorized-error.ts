export class UnaunthorizedError extends Error {
  constructor () {
    super('Unaunthorized')
    this.name = 'UnauthorizedError'
  }
}
