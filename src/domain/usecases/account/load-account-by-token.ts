import { AccountModel } from '@/domain/models/account'

export type LoadAccountByToken = {
  loadByToken: (accessToken: string, role?: string) => Promise<AccountModel>
}
