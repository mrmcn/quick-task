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
