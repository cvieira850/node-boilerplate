/* eslint-disable node/no-path-concat */
const {
  NODE_ENV, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_SYNC, DB_DROP_SCHEMA
} = process.env

module.exports = {
  name: 'default',
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: DB_SYNC === 'true',
  dropSchema: DB_DROP_SCHEMA === 'true',
  entities: [
    (NODE_ENV !== 'prod')
      ? `${__dirname}/src/infra/db/pg/typeorm/entities/*.ts`
      : `${__dirname}/dist/infra/db/pg/typeorm/entities/*.js`
  ],
  migrations: [
    (NODE_ENV !== 'prod')
      ? `${__dirname}/src/infra/db/pg/typeorm/migrations/*.ts`
      : `${__dirname}/dist/infra/db/pg/typeorm/migrations/*.js`
  ],
  cli: {
    migrationsDir: `${__dirname}/src/infra/db/pg/typeorm/migrations`,
    entitiesDir: `${__dirname}/src/infra/db/pg/typeorm/entities`
  }
}
