
import { RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'

export const makeAddRoleToUserValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['userId','roleId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
