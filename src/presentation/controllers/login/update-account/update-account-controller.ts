import { Controller,HttpRequest, HttpResponse, Validation, UpdateAccount } from './update-account-protocols'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'

export class UpdateAccountController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateAccount: UpdateAccount
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      await this.updateAccount.update(httpRequest.body)
      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
