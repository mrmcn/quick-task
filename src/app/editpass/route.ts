import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function GET() {
  try {
    const hashedPassword = await bcrypt.hash('123456', 10)
    await prisma.user.update({
      where: { id: '35cc0da1-fc3b-47bc-867a-f4e887485a39' },
      data: { password: hashedPassword },
    })

    return Response.json({ message: 'Database seeded successfully' })
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
