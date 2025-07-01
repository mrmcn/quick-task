import prisma from '@/lib/db/prisma'
import { Prisma, User } from '@prisma/client'
import { VoidPromise } from '../interfaces/tasks'
import { IUserRepository } from '../interfaces/user'

const createUser = async (data: Prisma.UserCreateInput): VoidPromise => {
  await prisma.user.create({
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

const getSelectUser = async <T extends Prisma.UserSelect>(
  where: Prisma.UserWhereUniqueInput,
  select: T,
): Promise<Prisma.UserGetPayload<{ select: T }>> => {
  return await prisma.user.findUniqueOrThrow({
    where,
    select,
  })
}

const deleteUser = async (where: Prisma.UserWhereUniqueInput): VoidPromise => {
  const deleteTasks = prisma.task.deleteMany({ where: { authorId: where.id } })
  const deleteUser = prisma.user.delete({ where })
  await prisma.$transaction([deleteTasks, deleteUser])
}

export const userRepository: IUserRepository = {
  updateUser,
  getUser,
  createUser,
  deleteUser,
  getSelectUser,
}
