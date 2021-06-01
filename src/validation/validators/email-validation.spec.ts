import { EmailValidation } from './email-validation'
import { InvalidParamError } from '@/presentation/errors'
import { EmailValidatorSpy } from '@/validation/test'
import { throwError } from '@/domain/test'
import faker from 'faker'

type SutTypes = {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation('email',emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
  }
}
let email: string

describe('Email Validation', () => {
  beforeEach(() => {
    email = faker.internet.email()
  })
  test('Should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.result = false
    const error = sut.validate({ email })
    expect(error).toEqual(new InvalidParamError('email'))
  })
  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut()
    sut.validate({ email })
    expect(emailValidatorSpy.email).toBe(email)
  })

  test('Should throw if EmailValidator throws ', () => {
    const { sut,emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy,'isValid').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })

  test('Should not return if EmailValidator succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ email })
    expect(error).toBeFalsy()
  })
})
