import paths from './paths'
import components from './components'
import schemas from './schemas'

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
  paths,
  schemas,
  components,
  contact: {
    name: 'Caio Vieira',
    email: 'contato@caiovieira.com.br'
  }
}
