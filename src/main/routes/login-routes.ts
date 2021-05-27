import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { adaptMiddleware } from '@/main/adapters/express-middleware-adapter'
import { makeSignUpController } from '@/main/factories/controllers/login/signup/signup-controller-factory'
import { makeLoginController } from '@/main/factories/controllers/login/login/login-controller-factory'
import { makeAuthMiddleware } from '@/main/factories/middlewares/auth-middleware-factory'
import { makeAddRoleToUserController } from '@/main/factories/controllers/login/add-role-to-user/add-role-to-user-controller-factory'
import { makeLoadAccountByIdController } from '@/main/factories/controllers/login/load-account-by-id/load-account-by-id-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  const auth = adaptMiddleware(makeAuthMiddleware())
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
  router.post('/users/role', adaptRoute(makeAddRoleToUserController()))
  router.get('/users/:userId',auth, adaptRoute(makeLoadAccountByIdController()))
}
