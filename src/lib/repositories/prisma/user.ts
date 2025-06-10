import prisma from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { VoidPromise } from '../interfaces/tasks'
import { IUserRepository } from '../interfaces/user'

const createUser = async (data: Prisma.UserCreateInput): VoidPromise => {
  prisma.user.create({
    data,
  })
}

const updateUser = async (
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput,
): VoidPromise => {
  await prisma.user.update({
    where,
    data,
  })
}

const getUser = async (where: Prisma.UserWhereUniqueInput): Promise<User> => {
  return await prisma.user.findUniqueOrThrow({
    where,
  })
}

const deleteUser = async (where: Prisma.UserWhereUniqueInput) => {
  const deleteTasks = prisma.task.deleteMany({ where: { authorId: where.id } })
  const deleteUser = prisma.user.delete({ where })
  await prisma.$transaction([deleteTasks, deleteUser])
}

export const userRepository: IUserRepository = {
  updateUser,
  getUser,
  createUser,
  deleteUser,
}
