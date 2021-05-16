import { AddRole, Controller, HttpRequest, HttpResponse, Validation } from './add-role-controller-protocols'
import { badRequest, forbidden } from '../../../helpers/http/http-helper'
import { RoleIsAlreadyRegisteredError } from '../../../errors'

export class AddRoleController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addRole: AddRole
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    await this.addRole.add(httpRequest.body)
    return forbidden(new RoleIsAlreadyRegisteredError())
  }
}
