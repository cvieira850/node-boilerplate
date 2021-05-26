import { Controller, HttpRequest, HttpResponse, LoadAccountById } from './load-account-by-id-protocols'

export class LoadAccountByIdController implements Controller {
  constructor (private readonly loadAccountById: LoadAccountById) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadAccountById.loadById(httpRequest.params.userId)
    return new Promise(resolve => resolve(null))
  }
}
