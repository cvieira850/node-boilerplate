import { DbLoadAccountById } from './db-load-account-by-id'
import { throwError } from '@/domain/test'
import { LoadAccountByIdRepositorySpy } from '@/data/test'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadAccountById
  loadAccountByIdRepositorySpy: LoadAccountByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositorySpy = new LoadAccountByIdRepositorySpy()
  const sut = new DbLoadAccountById(
    loadAccountByIdRepositorySpy
  )
  return {
    sut,
    loadAccountByIdRepositorySpy
  }
}
let userId: string
describe('DbLoadAccountById UseCase', () => {
  beforeEach(() => {
    userId = faker.datatype.uuid()
  })
  test('Should call LoadAccountByIdRepository with correct id' , async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    await sut.loadById(userId)
    expect(loadAccountByIdRepositorySpy.userId).toBe(userId)
  })

  test('Should throw if LoadAccountByIdRepository throws', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByIdRepositorySpy,'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById(userId)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success' , async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    const account = await sut.loadById(userId)
    expect(account).toEqual(loadAccountByIdRepositorySpy.accountModel)
  })
})
