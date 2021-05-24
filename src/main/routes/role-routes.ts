import { makeAuthMiddleware } from '@/main/factories/middlewares/auth-middleware-factory'
import { makeAddRoleController } from '@/main/factories/controllers/role/add-role-controller-factory'
import { adaptMiddleware } from '@/main/adapters/express-middleware-adapter'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { Router } from 'express'

export default (router: Router): void => {
  const auth = adaptMiddleware(makeAuthMiddleware())
  router.post('/roles',auth, adaptRoute(makeAddRoleController()))
}
