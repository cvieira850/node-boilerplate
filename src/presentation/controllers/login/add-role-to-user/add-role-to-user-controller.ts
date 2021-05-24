import { Controller, HttpRequest, HttpResponse, Validation, AddRoleToUser } from './add-role-to-user-protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidRoleOrUserError } from '@/presentation/errors'

export class AddRoleToUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addRoleToUser: AddRoleToUser
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        console.log(error)
        return badRequest(error)
      }
      const user = await this.addRoleToUser.addRoleToUser(httpRequest.body)
      if (!user) {
        return forbidden(new InvalidRoleOrUserError())
      }
      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}
