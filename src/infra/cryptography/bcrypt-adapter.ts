import bcrypt from 'bcrypt'
import { Hash } from '../../data/protocols/cryptography/hash'

export class BcryptAdapter implements Hash {
  constructor (private readonly salt: number) { }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value,this.salt)
    return hash
  }
}
