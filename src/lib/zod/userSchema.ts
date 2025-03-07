import { z } from 'zod'

export const User = z.object({
  name: z
    .string({ message: '"This field is required."' })
    .min(3, { message: 'Must be more than three letters' }), //This field is required.
  email: z.string({ message: '"This field is required."' }).email(), //This field is required.
  password: z
    .string({ message: '"This field is required."' })
    .min(6, { message: 'Must be more than six characters' }),
})

export const Name = User.omit({
  email: true,
  password: true,
})

export const Password = User.omit({
  name: true,
  email: true,
})

export const Email = User.omit({
  name: true,
  password: true,
})

export const AuthOrCreate = User.omit({
  name: true,
})
