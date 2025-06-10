import { Prisma, User } from '@prisma/client'
import { VoidPromise } from './tasks'

export interface IUserRepository {
  updateUser: (
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ) => VoidPromise
  getUser: (where: Prisma.UserWhereUniqueInput) => Promise<User>
  createUser: (data: Prisma.UserCreateInput) => VoidPromise
  deleteUser: (where: Prisma.UserWhereUniqueInput) => VoidPromise
  // ... other methods can be added here
}
