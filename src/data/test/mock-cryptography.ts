import { Hash } from '@/data/protocols/cryptography/hash'
import { Decrypter } from '@/data/protocols/cryptography/decrypter'
import { HashComparer } from '@/data/protocols/cryptography/hash-comparer'
import { Encrypt } from '@/data/protocols/cryptography/encrypt'

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return Promise.resolve('any_value')
    }
  }
  return new DecrypterStub()
}

export const mockHashCompare = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new HashComparerStub()
}

export const mockHash = (): Hash => {
  class HashStub implements Hash {
    async hash (value: string): Promise<string> {
      return Promise.resolve('hashed_password')
    }
  }
  return new HashStub()
}

export const mockEncrypt = (): Encrypt => {
  class EncryptStub implements Encrypt {
    async encrypt (id: string): Promise<string> {
      return Promise.resolve('any_token')
    }
  }
  return new EncryptStub()
}
