import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddRoleController } from '../factories/controllers/add-role/add-role-controller-factory'

export default (router: Router): void => {
  router.post('/roles', adaptRoute(makeAddRoleController()))
}
