export interface Encrypt {
  encrypt: (id: string) => Promise<string>
}
