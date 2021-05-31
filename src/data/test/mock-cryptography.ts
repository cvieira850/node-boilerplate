import { Hash } from '@/data/protocols/cryptography/hash'
import { Decrypter } from '@/data/protocols/cryptography/decrypter'
import { HashComparer } from '@/data/protocols/cryptography/hash-comparer'
import { Encrypt } from '@/data/protocols/cryptography/encrypt'
import faker from 'faker'

export class DecrypterSpy implements Decrypter {
  plaintext = faker.internet.password()
  ciphertext: string

  async decrypt (ciphertext: string): Promise<string> {
    this.ciphertext = ciphertext
    return Promise.resolve(this.plaintext)
  }
}

export class HashComparerSpy implements HashComparer {
  plaintext: string
  digest: string
  isValid = true

  async compare (plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext
    this.digest = digest
    return Promise.resolve(this.isValid)
  }
}

export class HashSpy implements Hash {
  digest = faker.datatype.uuid()
  plaintext: string

  async hash (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return Promise.resolve(this.digest)
  }
}

export const mockEncrypt = (): Encrypt => {
  class EncryptStub implements Encrypt {
    async encrypt (id: string): Promise<string> {
      return Promise.resolve('any_token')
    }
  }
  return new EncryptStub()
}
