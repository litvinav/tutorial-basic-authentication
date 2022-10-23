import { createCipheriv, createDecipheriv } from 'crypto'
import z from 'zod'

const algorithm = 'aes-256-cbc'
// Zod is used to make sure the following values are set
const key = z.string().length(32).parse(process.env.ENCRYPTION_KEY)
const iv_length = 16

// https://nodejs.org/api/crypto.html#class-cipher
export const encrypt = (token: string) => {
  const iv = Buffer.alloc(iv_length)
  
  const cipher = createCipheriv(algorithm, key, iv)
  let encryptedData = cipher.update(token, "utf-8", "hex")
  return encryptedData += cipher.final("hex")
}

// https://nodejs.org/api/crypto.html#class-decipher
export const decrypt = (encrypted: string) => {
  const iv = Buffer.alloc(iv_length)
  const decipher = createDecipheriv(algorithm, key, iv)
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  return decrypted += decipher.final('utf8')
}
