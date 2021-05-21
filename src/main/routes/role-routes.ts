import { Router } from 'express'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeAddRoleController } from '../factories/controllers/role/add-role-controller-factory'
import { adaptMiddleware } from '../adapters/express-middleware-adapter copy'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/roles',adminAuth, adaptRoute(makeAddRoleController()))
}
