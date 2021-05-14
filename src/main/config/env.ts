import dotenv from 'dotenv'
import path from 'path'

const { NODE_ENV } = process.env

const envName = NODE_ENV === 'test' ? '.env.test' : (NODE_ENV === 'dev' ? '.env.dev' : '.env')
export default dotenv.config({ path: path.resolve(__dirname,`../../../${envName}`) })
