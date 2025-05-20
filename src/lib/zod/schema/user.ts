import {
  ListLabels,
  TextFieldsNameAttributeList,
} from '@/lib/constants/text-const'
import { z } from 'zod'

export const UserSchema = z.object({
  [TextFieldsNameAttributeList.name]: z
    .string({ message: '"This field is required."' })
    .min(3, { message: 'Must be more than three letters' }), //This field is required.
  [TextFieldsNameAttributeList.email]: z
    .string({ message: '"This field is required."' })
    .email(), //This field is required.
  [TextFieldsNameAttributeList.password]: z
    .string({ message: '"This field is required."' })
    .min(6, { message: '"Must be more than six characters"' }),
})

export const NameSchema = UserSchema.pick({
  [TextFieldsNameAttributeList.name]: true,
})

export const PasswordSchema = UserSchema.pick({
  [TextFieldsNameAttributeList.password]: true,
})

export const EmailSchema = UserSchema.pick({
  [TextFieldsNameAttributeList.email]: true,
})

export const EmailAndPasswordSchema = UserSchema.pick({
  [TextFieldsNameAttributeList.email]: true,
  [TextFieldsNameAttributeList.password]: true,
})

export const ChangePasswordSchema = z
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
