import { Controller, HttpRequest, HttpResponse, Validation } from './add-role-controller-protocols'

export class AddRoleController implements Controller {
  constructor (private readonly validation: Validation) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return new Promise(resolve => resolve(null))
  }
}
