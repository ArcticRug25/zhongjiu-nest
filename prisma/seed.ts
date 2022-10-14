import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'

const prisma = new PrismaClient()

async function run() {
  await prisma.user.create({
    data: {
      username: 'admin',
      password: await hash('admin888'),
      role: 'admin',
    },
  })
}

run()
