import { Controller, HttpRequest, HttpResponse, LoadAccounts } from './load-accounts-protocols'
import { serverError } from '@/presentation/helpers/http/http-helper'

export class LoadAccountsController implements Controller {
  constructor (private readonly loadAccounts: LoadAccounts) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.loadAccounts.load()
      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
