import type { NextApiRequest, NextApiResponse } from 'next'
import PrismaClient from '../../../prisma/client'
import z from 'zod'
import crypto from 'crypto'

// function "formValidator" to double check send values from req.body
const formValidator = z.object({
  confirm_password: z.string().min(6),
  email: z.string().min(4).email(),
  password: z.string().min(6),
  username: z.string().min(4),
}).superRefine(({ confirm_password, password }, ctx) => {
  if (confirm_password !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match"
    });
  }
})

const hashPassword = (password: string) => crypto.createHash('sha256').update(password).digest('hex')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  if (req.method === 'POST') {
    const { email, username, password } = req.body

    // verify that the data provided is correct; zod module is used for validation
    try {
      formValidator.parse(req.body)
      await PrismaClient.user.create({
        data: {
          email,
          password: hashPassword(password),
          username,
        },
        select: { id: true ,password: false }
      })
      return res.status(302).setHeader("Location", "/login").send()
    }
    // otherwise redirect to signup for a retry; User feedback out of scope for this example
    catch (error) {
      if (req.body.password) {
        req.body.password = "REDACTED"
      }
      if (req.body.confirm_password) {
        req.body.confirm_password = "REDACTED"
      }
      console.log(req.body)

      if (error instanceof Error) {
        console.error(error.message)
      }
      return res.status(302).setHeader("Location", "/signup").send()
    }
  }
  return res.status(405).send()
}
