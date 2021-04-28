import { Encrypt } from '../../../data/protocols/cryptography/encrypt'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypt {
  constructor (private readonly secret: string) {}
  async encrypt (id: string): Promise<string> {
    await jwt.sign({ id: id }, this.secret)
    return new Promise(resolve => resolve(null))
  }
}
