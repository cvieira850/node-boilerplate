export const addRolePath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Role'],
    operationId: 'post',
    summary: 'API para criar uma função',
    requestBody: {
      description: '',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addRoleParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/role'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
