import { z } from 'zod'

export const UserSchema = z.object({
  name: z
    .string({ message: '"This field is required."' })
    .min(3, { message: 'Must be more than three letters' }), //This field is required.
  email: z.string({ message: '"This field is required."' }).email(), //This field is required.
  password: z
    .string({ message: '"This field is required."' })
    .min(6, { message: 'Must be more than six characters' }),
})

export const NameSchema = UserSchema.omit({
  email: true,
  password: true,
})

export const PasswordSchema = UserSchema.omit({
  name: true,
  email: true,
})

export const EmailSchema = UserSchema.omit({
  name: true,
  password: true,
})

export const EmailAndPasswordSchema = UserSchema.omit({
  name: true,
})
