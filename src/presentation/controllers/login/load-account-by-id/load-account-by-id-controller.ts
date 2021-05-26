import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadAccountById } from './load-account-by-id-protocols'

export class LoadAccountByIdController implements Controller {
  constructor (private readonly loadAccountById: LoadAccountById) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const user = await this.loadAccountById.loadById(httpRequest.params.userId)
      if (!user) {
        return forbidden(new InvalidParamError('userId'))
      }
      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}
