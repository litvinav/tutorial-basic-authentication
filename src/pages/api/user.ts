import type { NextApiRequest, NextApiResponse } from 'next'
import PrismaClient from '../../../prisma/client'
import { decrypt } from '../../helpers/cryptography'
import z from 'zod'
import { User } from '@prisma/client'

function getJWT(cookies: string): string|undefined {
  const prefix = 'identity='
  const identityCookie = cookies.split(',').find(cookie => cookie.startsWith(prefix))
  return identityCookie?.slice(prefix.length)
}

const validator = z.object({
  user: z.string().uuid(),
  expires: z.number(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<User>|void>
) {
  if (req.method === 'GET') {
    const identity = getJWT(req.headers.cookie ?? '')
    if (typeof identity == 'undefined') {
      return res.status(401).send()
    }
    try {
      const JWT = JSON.parse(decrypt(identity))
      const payload = validator.parse(JWT)

      if (payload.expires <= Date.now()) {
        throw new Error('Access timed out')
      }
      const data = await PrismaClient.user.findFirst({ where: { id: payload.user } })
      if (data) {
        return res.json({ username: data.username, id: data.id })
      }
      throw new Error('Invalid user id')
    } catch (error) {
      return res.status(403).setHeader('set-cookie', 'identity=; expires=Thu, 01 Jan 1970 00:00:00 GMT').send()
    }
  }
  return res.status(405).send()
}
