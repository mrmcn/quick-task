import prisma from '@/lib/db/prisma'
import { VoidPromise } from '@/lib/repositories/interfaces/tasks'
import { IUserRepository } from '@/lib/repositories/interfaces/user'
import { SelectedUserData } from '@/lib/services/types'
import { Prisma } from '@prisma/client'

/**
 * This `user.ts` module implements `IUserRepository`, providing methods
 * for interacting with the `User` table in the database using Prisma.
 *
 * It encapsulates data access logic, separating it from business logic
 * and UI components, ensuring a clean and maintainable approach to
 * managing user data.
 */

/**
 * Creates a new user in the database.
 *
 * @param data An object containing the data to create the user, conforming to Prisma.UserCreateInput.
 * @returns  A Promise that resolves with no value upon successful creation.
 */
const createUser = async (data: Prisma.UserCreateInput): VoidPromise => {
  await prisma.user.create({
    data,
  })
}

/**
 * Updates an existing user in the database.
 *
 * @param where An object defining the unique criteria to find the user to update.
 * For example, `{ id: 'someId' }` or `{ email: 'user@example.com' }`.
 * @param data An object containing the data to update the user, conforming to Prisma.UserUpdateInput.
 * @returns A Promise that resolves with no value upon successful update.
 */
const updateUser = async (
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput,
): VoidPromise => {
  await prisma.user.update({
    where,
    data,
  })
}

/**
 * Retrieves a unique user from the database, allowing specific fields to be selected.
 * Throws an error if the user is not found.
 *
 * @template T The type extending `Prisma.UserSelect`, defining the fields to select.
 * @param where An object defining the unique criteria to find the user.
 * For example, `{ id: 'someId' }`.
 * @param select A Prisma `select` object indicating which user fields to return.
 * @returns  A Promise that resolves with the selected user data.
 * @throws Prisma.NotFoundError If the user is not found.
 */
const getSelectUser = async <T extends Prisma.UserSelect>(
  where: Prisma.UserWhereUniqueInput,
  select: T,
): Promise<SelectedUserData<T>> => {
  return await prisma.user.findUniqueOrThrow({
    where,
    select,
  })
}

/**
 * Deletes a user and all tasks associated with them from the database.
 * The operation is performed within a transaction to ensure data integrity:
 * either both deletions succeed, or neither does.
 *
 * @param where An object defining the unique criteria to find the user to delete.
 * It's important that `where.id` is present for deleting associated tasks.
 * @returns  A Promise that resolves with no value upon successful deletion.
 */
const deleteUser = async (where: Prisma.UserWhereUniqueInput): VoidPromise => {
  // Delete all tasks belonging to the user
  const deleteTasks = prisma.task.deleteMany({ where: { authorId: where.id } })
  // Delete the user themselves
  const deleteUser = prisma.user.delete({ where })

  // Execute both operations as a single transaction
  await prisma.$transaction([deleteTasks, deleteUser])
}

/**
 * The `userRepository` object, which exports the implementation of the `IUserRepository` interface.
 * It contains all user-related CRUD operations, ready for use in services or
 * other application layers.
 */
export const userRepository: IUserRepository = {
  updateUser,
  createUser,
  deleteUser,
  getSelectUser,
}
