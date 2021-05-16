import { AddRole, Controller, HttpRequest, HttpResponse, Validation } from './add-role-controller-protocols'
import { badRequest, forbidden, ok, serverError } from '../../../helpers/http/http-helper'
import { RoleIsAlreadyRegisteredError } from '../../../errors'

export class AddRoleController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addRole: AddRole
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const role = await this.addRole.add(httpRequest.body)
      if (!role) {
        return forbidden(new RoleIsAlreadyRegisteredError())
      }
      return ok(role)
    } catch (error) {
      return serverError(error)
    }
  }
}
