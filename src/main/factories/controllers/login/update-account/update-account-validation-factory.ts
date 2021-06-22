
import { Validation } from '@/presentation/protocols/validation'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeUpdateAccountValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name','email']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email',new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
