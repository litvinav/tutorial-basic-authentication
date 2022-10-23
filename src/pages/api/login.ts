import type { NextApiRequest, NextApiResponse } from 'next'
import PrismaClient from '../../../prisma/client'
import { createHash } from 'crypto'
import { encrypt } from '../../helpers/cryptography'

const hashPassword = (password: string) => createHash('sha256').update(password).digest('hex')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  if (req.method === 'POST') {
    const { email, password } = req.body
    const user = await PrismaClient.user.findFirst({
      where: {
        email,
        password: hashPassword(password)
      },
      select: { id: true }
    })

    if (user) {
      const duration = 10 * 60 * 1000 // 10 minutes
      const expires = new Date(Date.now() + duration)
      const JWT = { user: user?.id, expires: expires.valueOf() }
      const identity = encrypt(JSON.stringify(JWT))
      return res
      .setHeader('Set-Cookie', `identity=${identity}; HttpOnly; SameSite=Lax; Expires=${expires.toUTCString()}`)
      .setHeader('Location', '/')
      .status(302)
      .send()
    }

    return res
      .setHeader('Location', '/signup')
      .status(302)
      .send()
  }
  return res.status(405).send()
}
