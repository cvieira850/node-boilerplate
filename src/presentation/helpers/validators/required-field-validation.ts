import { Validation } from './validation'
import { MissingParamError } from '../../errors'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fildName: string) {}
  validate (input: any): Error {
    if (!input[this.fildName]) {
      return new MissingParamError(this.fildName)
    }
  }
}
