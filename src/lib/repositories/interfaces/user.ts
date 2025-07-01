import { Prisma, User } from '@prisma/client'
import { VoidPromise } from './tasks'

export interface IUserRepository {
  updateUser: (
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ) => VoidPromise
  createUser: (data: Prisma.UserCreateInput) => VoidPromise
  deleteUser: (where: Prisma.UserWhereUniqueInput) => VoidPromise
  getUser: (where: Prisma.UserWhereUniqueInput) => Promise<User>
  getSelectUser: <T extends Prisma.UserSelect>(
    where: Prisma.UserWhereUniqueInput,
    select: T,
  ) => Promise<
    Prisma.UserGetPayload<{
      select: T
    }>
  >
  // ... other methods can be added here
}
