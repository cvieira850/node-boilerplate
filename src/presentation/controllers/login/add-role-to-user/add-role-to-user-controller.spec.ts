import { Validation } from './add-role-to-user-protocols'
import { AddRoleToUserController } from './add-role-to-user-controller'

describe('AddRoleToUserController', () => {
  test('Should call validaton with correct values', async () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return null
      }
    }
    const validationStub = new ValidationStub()
    const sut = new AddRoleToUserController(validationStub)
    const validateSpy = jest.spyOn(validationStub,'validate')
    const httpRequest = {
      body: {
        userId: 'any_user_id',
        roleId: 'any_role_id'
      }
    }
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
