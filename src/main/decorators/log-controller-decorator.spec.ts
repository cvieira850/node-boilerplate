import { LogControllerDecorator } from './log-controller-decorator'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { mockAccountModel } from '@/domain/test'
import { LogErrorRepositorySpy } from '@/data/test'

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return Promise.resolve(ok(mockAccountModel()))
    }
  }
  return new ControllerStub()
}

const MakeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const makeFakeRequest = (): HttpRequest => (
  {
    body: {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }
)
type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositorySpy)
  return {
    sut,
    controllerStub,
    logErrorRepositorySpy
  }
}

describe('LogControllerDecorator', () => {
  test('Should call controller handle ', async () => {
    const { sut , controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub,'handle')
    await sut.handle(makeFakeRequest())
    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should return the same result of the controller ', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(mockAccountModel()))
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositorySpy } = makeSut()
    jest.spyOn(controllerStub,'handle').mockReturnValueOnce(Promise.resolve(MakeFakeServerError()))
    await sut.handle(makeFakeRequest())
    expect(logErrorRepositorySpy.stack).toBe('any_stack')
  })
})
