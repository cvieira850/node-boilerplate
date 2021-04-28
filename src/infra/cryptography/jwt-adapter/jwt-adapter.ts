import { Encrypt } from '../../../data/protocols/cryptography/encrypt'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypt {
  constructor (private readonly secret: string) {}
  async encrypt (id: string): Promise<string> {
    const accessToken = await jwt.sign({ id: id }, this.secret)
    return accessToken
  }
}
