export const addRoleParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'teste'
    }
  },
  required: ['name']
}
