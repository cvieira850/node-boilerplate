export const signUpParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'Caio Vieira'
    },
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string',
      example: '12345'
    },
    passwordConfirmation: {
      type: 'string',
      example: '12345'
    }
  },
  required: ['name', 'email', 'password', 'passwordConfirmation']
}
