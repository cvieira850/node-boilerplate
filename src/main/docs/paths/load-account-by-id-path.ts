export const loadAccountByIdPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Account'],
    operationId: 'get',
    summary: 'API para pegar dados de um usuário',
    parameters:
    [
      {
        in: 'path',
        name: 'userId',
        description: 'ID do usuário que deseja o retorno',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
          example: 'da35596c-faee-4ddb-8a4c-a3fa27306082'
        }
      }
    ],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account'
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
