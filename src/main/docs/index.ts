import { loadAccountByIdPath, loginPath } from './paths'
import { badRequest,serverError, unauthorized, notFound, forbidden } from './components'
import { accountSchema, errorSchema, loginParamsSchema, loginSchema, roleSchema, apiKeyAuthSchema } from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Node Boilerplate',
    description: 'Boilerplate de api feita em NodeJS',
    version: '1.0.0'
  },
  license: {
    name: 'MIT',
    url: 'https://opensource.org/licenses/MIT'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  },{
    name: 'Account'
  }],
  paths: {
    '/login': loginPath,
    '/users/{userId}': loadAccountByIdPath
  },
  schemas: {
    account: accountSchema,
    login: loginSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
    role: roleSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden
  },
  contact: {
    name: 'Caio Vieira',
    email: 'contato@caiovieira.com.br'
  }
}
