import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddRoleController } from '../factories/controllers/role/add-role-controller-factory'

export default (router: Router): void => {
  router.post('/roles', adaptRoute(makeAddRoleController()))
}
