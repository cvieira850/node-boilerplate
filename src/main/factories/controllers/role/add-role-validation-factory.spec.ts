import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols'
import { makeAddRoleValidation } from './add-role-validation-factory'

jest.mock('../../../../validation/validators/validation-composite')

describe('AddRoleValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddRoleValidation()
    const validations: Validation[] = []
    for (const field of ['name']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
