import { LoginController } from './login-controller'
import { HttpRequest } from './login-controller-protocols'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok, serverError, unaunthorized } from '@/presentation/helpers/http/http-helper'
import { AuthenticationSpy, ValidationSpy } from '@/presentation/test'
import { throwError } from '@/domain/test'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({
  body: {
    email: faker.internet.email,
    password: faker.internet.password()
  }
})

type SutTypes = {
  sut: LoginController
  authenticationSpy: AuthenticationSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationSpy = new ValidationSpy()
  const sut = new LoginController(authenticationSpy, validationSpy)

  return {
    sut,
    authenticationSpy,
    validationSpy
  }
}

describe('Login Controller', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(authenticationSpy.authentication).toEqual({
      email: httpRequest.body.email,
      password: httpRequest.body.password
    })
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    authenticationSpy.token = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unaunthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy,'auth').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut,authenticationSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ accessToken: authenticationSpy.token }))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toBe(httpRequest.body)
  })

  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    const field = faker.random.word()
    jest.spyOn(validationSpy,'validate').mockReturnValueOnce(new MissingParamError(field))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError(field)))
  })
})
