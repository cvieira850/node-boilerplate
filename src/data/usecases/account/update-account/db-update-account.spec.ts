import { DbUpdateAccount } from './db-update-account'
import { UpdateAccountRepositorySpy } from '@/data/test'
import { mockUpdateAccountParams, throwError } from '@/domain/test'

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
  describe('Update Account Repository', () => {
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

    test('Should throw if UpdateAccountRepository throws', async () => {
      const { sut, updateAccountRepositorySpy } = makeSut()
      jest.spyOn(updateAccountRepositorySpy,'update').mockImplementationOnce(throwError)
      const promise = sut.update(mockUpdateAccountParams())
      await expect(promise).rejects.toThrow()
    })
  })
})
