import { Controller, HttpRequest, HttpResponse, Validation, AddRoleToUser } from './add-role-to-user-protocols'
import { badRequest, forbidden, serverError } from '../../../helpers/http/http-helper'
import { InvalidRoleOrUserError } from '../../../errors'

export class AddRoleToUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addRoleToUser: AddRoleToUser
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const user = await this.addRoleToUser.addRoleToUser(httpRequest.body)
      if (!user) {
        return forbidden(new InvalidRoleOrUserError())
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
