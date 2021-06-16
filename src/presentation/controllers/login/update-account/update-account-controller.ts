import { Controller,HttpRequest, HttpResponse, Validation, UpdateAccount } from './update-account-protocols'
import { badRequest, forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { EmailInUseError } from '@/presentation/errors'

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
      const updatedAccount = await this.updateAccount.update(httpRequest.body)
      if (!updatedAccount) {
        return forbidden(new EmailInUseError())
      }
      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
