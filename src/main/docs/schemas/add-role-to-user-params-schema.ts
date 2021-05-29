export const addRoleToUserParamsSchema = {
  type: 'object',
  properties: {
    userId: {
      type: 'string',
      format: 'uuid'
    },
    roleId: {
      type: 'string',
      format: 'uuid'
    }
  },
  required: ['userId','roleId']
}
