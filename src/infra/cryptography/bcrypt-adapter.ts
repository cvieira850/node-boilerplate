import bcrypt from 'bcrypt'
import { Hash } from '../../data/protocols/cryptography/hash'
import { HashComparer } from '../../data/protocols/cryptography/hash-comparer'

export class BcryptAdapter implements Hash, HashComparer {
  constructor (private readonly salt: number) { }
  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value,this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    await bcrypt.compare(value,hash)
    return null
  }
}
