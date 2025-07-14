import { SelectedUserData } from '@/lib/services/types'
import { Prisma } from '@prisma/client'
import { VoidPromise } from './tasks'

/**
 * This file defines the `IUserRepository` interface, which outlines the contract
 * for interacting with user data in the database.
 */
export interface IUserRepository {
  /**
   * Updates an existing user in the database.
   *
   * @param where Unique criteria to identify the user to be updated (e.g., by ID or email).
   * @param data The data to apply to the user record, conforming to Prisma's update input.
   * @returns  A Promise that resolves when the update operation is complete.
   */
  updateUser: (
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ) => VoidPromise
  /**
   * Creates a new user record in the database.
   *
   * @param data The data required to create a new user, conforming to Prisma's create input.
   * @returns } A Promise that resolves when the user creation is complete.
   */
  createUser: (data: Prisma.UserCreateInput) => VoidPromise
  /**
   * Deletes a user record from the database.
   * Note: Implementations of this method typically also handle cascading deletions
   * (e.g., deleting all tasks associated with the user).
   *
   * @param where Unique criteria to identify the user to be deleted.
   * @returns  A Promise that resolves when the deletion operation is complete.
   */
  deleteUser: (where: Prisma.UserWhereUniqueInput) => VoidPromise
  /**
   * Retrieves a unique user from the database, allowing for specific fields to be selected.
   * This method typically throws an error if the user is not found.
   *
   * @template T A Prisma `UserSelect` type that specifies which fields of the user to return.
   * @param where Unique criteria to find the user.
   * @param select A Prisma `select` object indicating the specific fields to fetch.
   * @returns A Promise that resolves with the selected user data.
   */
  getSelectUser: <T extends Prisma.UserSelect>(
    where: Prisma.UserWhereUniqueInput,
    select: T,
  ) => Promise<SelectedUserData<T>>
  // ... other methods can be added here following the contract
}
