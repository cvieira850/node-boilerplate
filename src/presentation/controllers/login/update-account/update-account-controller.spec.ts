import { HttpRequest } from './update-account-protocols'
import { UpdateAccountController } from './update-account-controller'
import faker from 'faker'
import { ValidationSpy } from '@/presentation/test'

const mockRequest = (): HttpRequest => (
  {
    body: {
      name: faker.name.findName(),
      email: faker.internet.email()
    }
  }
)

type SutTypes = {
  sut: UpdateAccountController
  validationSpy: ValidationSpy
}
const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new UpdateAccountController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

describe('UpdateAccount Controller', () => {
  test('Should call validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toBe(httpRequest.body)
  })
})
