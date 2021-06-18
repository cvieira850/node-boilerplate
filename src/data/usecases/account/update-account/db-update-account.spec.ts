import { DbUpdateAccount } from './db-update-account'
import { UpdateAccountRepositorySpy } from '@/data/test'
import { mockUpdateAccountParams } from '@/domain/test'

type SutTypes = {
  sut: DbUpdateAccount
  updateAccountRepositorySpy: UpdateAccountRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateAccountRepositorySpy = new UpdateAccountRepositorySpy()
  const sut = new DbUpdateAccount(updateAccountRepositorySpy)
  return {
    sut,
    updateAccountRepositorySpy
  }
}
describe('DbUpdateAccount Usecase', () => {
  describe('Update Account Repository', () => [
    test('Should call UpdateAccountRepository with correct values', async () => {
      const { sut,updateAccountRepositorySpy } = makeSut()
      const updateAccountParams = mockUpdateAccountParams()
      await sut.update(updateAccountParams)
      expect(updateAccountRepositorySpy.updateAccountParams).toEqual({
        id: updateAccountParams.id,
        name: updateAccountParams.name,
        email: updateAccountParams.email
      })
    })
  ])
})
