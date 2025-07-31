import { PAGE_VALUE } from '@/lib/constants/data/ui-config'
import { LabelsList, NameAttributeList } from '@/lib/constants/text-const'
import { z } from 'zod'

/**
 * The primary Zod schema for core user data.
 * Defines general validation rules for fields used across various user-related forms.
 */
const user = z.object({
  // User's name field. Required, with a minimum length of 3 characters.
  [NameAttributeList.name]: z
    .string({ message: '"This field is required."' })
    .min(3, { message: 'Must be more than three letters' }),
  // User's email field. Required, and must be a valid email format.
  [NameAttributeList.email]: z
    .string({ message: '"This field is required."' })
    .email(),
  // User's password field. Required, with a minimum length of 6 characters.
  [NameAttributeList.password]: z
    .string({ message: '"This field is required."' })
    .min(6, { message: '"Must be more than six characters"' }),
  // Field for the number of items to display per page.
  // Uses `z.union` with `z.literal` to restrict values to only those explicitly defined in `PAGE_VALUE`.
  perPageNumber: z.union(
    PAGE_VALUE.map((val) => z.literal(val)) as [
      z.ZodLiteral<(typeof PAGE_VALUE)[0]>,
      z.ZodLiteral<(typeof PAGE_VALUE)[1]>,
      ...Array<z.ZodLiteral<number>>,
    ],
  ),
})

/**
 * Validation schema for updating only the user's name.
 * Uses `user.pick` to select the `name` field from the main `user` schema.
 */
const name = user.pick({
  [NameAttributeList.name]: true,
})

/**
 * Validation schema for updating only the user's password (standalone, not for password change flow).
 * Uses `user.pick` to select the `password` field from the main `user` schema.
 */
const password = user.pick({
  [NameAttributeList.password]: true,
})

/**
 * Validation schema for updating only the user's email.
 * Uses `user.pick` to select the `email` field from the main `user` schema.
 */
const email = user.pick({
  [NameAttributeList.email]: true,
})

/**
 * Validation schema for user login or registration (requiring both email and password).
 * Uses `user.pick` to select both `email` and `password` fields from the main `user` schema.
 */
const emailAndPasswordInput = user.pick({
  [NameAttributeList.email]: true,
  [NameAttributeList.password]: true,
})

/**
 * Validation schema for updating the number of items per page.
 * Uses `user.pick` to select the `perPageNumber` field from the main `user` schema.
 */
const perPageNumber = user.pick({
  perPageNumber: true,
})

/**
 * Validation schema for changing a user's password.
 * Includes fields for the current password, a new password, and confirmation of the new password.
 * It uses `refine` to add a custom validation ensuring the new password and its confirmation match.
 */
const changePassword = z
  .object({
    // Field for the current password. Required, with a minimum length of 6 characters.
    [NameAttributeList.currentPassword]: z
      .string({ message: '"This field is required."' })
      .min(6, { message: '"Must be more than six characters"' }),
    // Field for the new password. Required, with a minimum length of 6 characters.
    [NameAttributeList.newPassword]: z
      .string({ message: '"This field is required."' })
      .min(6, { message: '"Must be more than six characters"' }),
    // Field for confirming the new password. Required.
    [NameAttributeList.confirmNewPassword]: z.string({
      message: '"This field is required."',
    }),
  })
  // Refinement validation: Checks if the new password and its confirmation match.
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'New passwords do not match',
    path: [LabelsList.confirmNewPassword], // Indicates the field where the error occurred
  })

/**
 * An object that exports all defined Zod schemas related to the user entity.
 * Provides a centralized access point for user validation schemas throughout the application.
 */
export const userSchemes: UserSchemes = {
  name,
  changePassword,
  password,
  email,
  emailAndPasswordInput,
  user,
  perPageNumber,
}

/**
 * Interface defining the structure of the `userSchemes` object.
 * Ensures type safety and provides autocompletion for available schemas.
 */
export interface UserSchemes {
  name: typeof name
  password: typeof password
  email: typeof email
  emailAndPasswordInput: typeof emailAndPasswordInput
  user: typeof user
  changePassword: typeof changePassword
  perPageNumber: typeof perPageNumber
}
