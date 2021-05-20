import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols'
import { makeAddRoleToUserValidation } from './add-role-to-user-validation-factory'

jest.mock('../../../../validation/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddRoleToUserValidation()
    const validations: Validation[] = []
    for (const field of ['userId','roleId']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
