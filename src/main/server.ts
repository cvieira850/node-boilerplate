// import app from './config/app'
import createConnection from '../infra/db/pg/typeorm/index'
import env from './config/env'

createConnection().then(async () => {
  const app = (await import ('./config/app')).default
  app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
})
  .catch(console.error)
