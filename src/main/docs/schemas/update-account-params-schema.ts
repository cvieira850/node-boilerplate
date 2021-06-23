export const updateAccountParamsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid'
    },
    name: {
      type: 'string',
      example: 'Caio Vieira'
    },
    email: {
      type: 'string',
      format: 'email'
    }
  },
  required: ['name', 'email']
}
