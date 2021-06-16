import { Controller,HttpRequest, HttpResponse, Validation } from './update-account-protocols'
import { badRequest } from '@/presentation/helpers/http/http-helper'

export class UpdateAccountController implements Controller {
  constructor (private readonly validation: Validation) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    return Promise.resolve(null)
  }
}
