import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    password: '123456',
    tasks: {
      create: [
        {
          summary: 'one',
          details: 'Alice one',
        },
        {
          summary: 'two',
          details: 'Alice two',
        },
        {
          summary: 'three',
          details: 'Alice three',
        },
      ],
    },
  },
  {
    name: 'Bob',
    email: 'bob@prisma.io',
    password: '654321',
    tasks: {
      create: [
        {
          summary: 'One',
          details: 'Bob one',
        },
        {
          summary: 'Two',
          details: 'Bob two',
        },
        {
          summary: 'Three',
          details: 'Bob three',
        },
      ],
    },
  },
]

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u })
  }
}

main()
