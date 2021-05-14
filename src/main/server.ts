import './config/env'
import createConnection from '../infra/db/pg/typeorm/index'

createConnection().then(async () => {
  const app = (await import ('./config/app')).default
  app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`))
})
  .catch(console.error)
