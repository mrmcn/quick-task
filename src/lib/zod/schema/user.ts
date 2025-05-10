import { z } from 'zod'

export const UserSchema = z.object({
  name: z
    .string({ message: '"This field is required."' })
    .min(3, { message: 'Must be more than three letters' }), //This field is required.
  email: z.string({ message: '"This field is required."' }).email(), //This field is required.
  password: z
    .string({ message: '"This field is required."' })
    .min(6, { message: '"Must be more than six characters"' }),
})

export const NameSchema = UserSchema.pick({
  name: true,
})

export const PasswordSchema = UserSchema.pick({
  password: true,
})

export const EmailSchema = UserSchema.pick({
  email: true,
})

export const EmailAndPasswordSchema = UserSchema.pick({
  email: true,
  password: true,
})

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string({ message: '"This field is required."' })
      .min(6, { message: '"Must be more than six characters"' }),
    newPassword: z
      .string({ message: '"This field is required."' })
      .min(6, { message: '"Must be more than six characters"' }),
    confirmNewPassword: z.string({ message: '"This field is required."' }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'New passwords do not match',
    path: ['confirmNewPassword'], // Indicates the field where the error occurred
  })
