import { Controller, HttpRequest, HttpResponse, LoadAccounts } from './load-accounts-protocols'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'

export class LoadAccountsController implements Controller {
  constructor (private readonly loadAccounts: LoadAccounts) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accounts = await this.loadAccounts.load()
      return ok(accounts)
    } catch (error) {
      return serverError(error)
    }
  }
}
