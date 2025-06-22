import { PAGE_VALUE } from '@/lib/constants/data/ui-config'
import {
  ListLabels,
  TextFieldsNameAttributeList,
} from '@/lib/constants/text-const'
import { z } from 'zod'

const user = z.object({
  [TextFieldsNameAttributeList.name]: z
    .string({ message: '"This field is required."' })
    .min(3, { message: 'Must be more than three letters' }), //This field is required.
  [TextFieldsNameAttributeList.email]: z
    .string({ message: '"This field is required."' })
    .email(), //This field is required.
  [TextFieldsNameAttributeList.password]: z
    .string({ message: '"This field is required."' })
    .min(6, { message: '"Must be more than six characters"' }),
  perPageNumber: z.union(
    PAGE_VALUE.map((val) => z.literal(val)) as [
      z.ZodLiteral<(typeof PAGE_VALUE)[0]>,
      z.ZodLiteral<(typeof PAGE_VALUE)[1]>,
      ...Array<z.ZodLiteral<number>>,
    ],
  ),
})

const name = user.pick({
  [TextFieldsNameAttributeList.name]: true,
})

const password = user.pick({
  [TextFieldsNameAttributeList.password]: true,
})

const email = user.pick({
  [TextFieldsNameAttributeList.email]: true,
})

const emailAndPasswordInput = user.pick({
  [TextFieldsNameAttributeList.email]: true,
  [TextFieldsNameAttributeList.password]: true,
})

const perPageNumber = user.pick({
  perPageNumber: true,
})

const changePassword = z
  .object({
    [TextFieldsNameAttributeList.currentPassword]: z
      .string({ message: '"This field is required."' })
      .min(6, { message: '"Must be more than six characters"' }),
    [TextFieldsNameAttributeList.newPassword]: z
      .string({ message: '"This field is required."' })
      .min(6, { message: '"Must be more than six characters"' }),
    [TextFieldsNameAttributeList.confirmNewPassword]: z.string({
      message: '"This field is required."',
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'New passwords do not match',
    path: [ListLabels.confirmNewPassword], // Indicates the field where the error occurred
  })

export const userSchemes: UserSchemes = {
  name,
  changePassword,
  password,
  email,
  emailAndPasswordInput,
  user,
  perPageNumber,
}

export interface UserSchemes {
  name: typeof name
  password: typeof password
  email: typeof email
  emailAndPasswordInput: typeof emailAndPasswordInput
  user: typeof user
  changePassword: typeof changePassword
  perPageNumber: typeof perPageNumber
}
