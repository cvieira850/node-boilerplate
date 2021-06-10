export const loadAccountsPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Account'],
    operationId: 'get',
    summary: 'API para pegar dados dos usuários',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/accounts'
            }
          }
        }
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
