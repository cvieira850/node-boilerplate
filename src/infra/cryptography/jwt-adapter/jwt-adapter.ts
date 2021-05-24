import { Encrypt } from '@/data/protocols/cryptography/encrypt'
import { Decrypter } from '@/data/protocols/cryptography/decrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypt, Decrypter {
  constructor (private readonly secret: string) {}
  async encrypt (id: string): Promise<string> {
    const accessToken = await jwt.sign({ id: id }, this.secret)
    return accessToken
  }

  async decrypt (value: string): Promise<string> {
    return await jwt.verify(value , this.secret) as any
  }
}
