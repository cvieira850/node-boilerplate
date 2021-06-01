import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidParamError } from '@/presentation/errors'
import faker from 'faker'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field','fieldToCompare')
}
let field: string

describe('CompareFields Validation', () => {
  beforeEach(() => {
    field = faker.name.jobTitle()
  })
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field,
      fieldToCompare: faker.name.jobTitle()
    })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      field,
      fieldToCompare: field
    })
    expect(error).toBeFalsy()
  })
})
