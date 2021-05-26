import { InvalidParamError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadAccountById } from './load-account-by-id-protocols'

export class LoadAccountByIdController implements Controller {
  constructor (private readonly loadAccountById: LoadAccountById) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const user = await this.loadAccountById.loadById(httpRequest.params.userId)
    if (!user) {
      return forbidden(new InvalidParamError('userId'))
    }
    return null
  }
}
