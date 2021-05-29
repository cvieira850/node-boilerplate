export const accountSchema = {
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
    },
    password: {
      type: 'string',
      example: '23142rdwsacfvs'
    },
    role_id: {
      type: 'string',
      format: 'uuid'
    },
    created_at: {
      type: 'string',
      format: 'date-time'
    },
    updated_at: {
      type: 'string',
      format: 'date-time'
    },
    deleted_at: {
      type: 'string',
      format: 'date-time'
    },
    access_token: {
      type: 'string',
      example: '232412e12rdfsc142rdwsacfvs'
    },
    role: {
      type: 'object',
      properties: {
        schema: {
          $ref: '#/schemas/role'
        }
      }
    }
  }
}
