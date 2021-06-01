import { LogControllerDecorator } from './log-controller-decorator'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { mockAccountModel } from '@/domain/test'
import { LogErrorRepositorySpy } from '@/data/test'

import faker from 'faker'

class ControllerSpy implements Controller {
  httpResponse = ok(mockAccountModel())
  httpRequest: HttpRequest

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.httpRequest = httpRequest
    return Promise.resolve(this.httpResponse)
  }
}
const stack = faker.random.words()
const MakeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = stack

  return serverError(fakeError)
}

const password = faker.internet.password()
const makeFakeRequest = (): HttpRequest => (
  {
    body: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password
    }
  }
)
type SutTypes = {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

describe('LogControllerDecorator', () => {
  test('Should call controller handle ', async () => {
    const { sut , controllerSpy } = makeSut()
    const fakeRequest = makeFakeRequest()
    await sut.handle(fakeRequest)
    expect(controllerSpy.httpRequest).toEqual(fakeRequest)
  })

  test('Should return the same result of the controller ', async () => {
    const { sut,controllerSpy } = makeSut()
    const fakeRequest = makeFakeRequest()
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(controllerSpy.httpResponse)
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    jest.spyOn(controllerSpy,'handle').mockReturnValueOnce(Promise.resolve(MakeFakeServerError()))
    await sut.handle(makeFakeRequest())
    expect(logErrorRepositorySpy.stack).toBe(stack)
  })
})
