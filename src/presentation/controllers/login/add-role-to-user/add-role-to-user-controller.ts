import { badRequest } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation, AddRoleToUser } from './add-role-to-user-protocols'

export class AddRoleToUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addRoleToUser: AddRoleToUser
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    await this.addRoleToUser.addRoleToUser(httpRequest.body)
    return badRequest(error)
  }
}
