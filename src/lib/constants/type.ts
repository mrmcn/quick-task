/**
 * This file contains type definitions that ensure strict typing
 * for constants.
 */

// Imports of constants from which type values are generated
import {
  ListBtnNames,
  ListChipNames,
  ListDefaultSearchParameter,
  ListError,
  ListFormNames,
  ListLabels,
  ListPhrases,
  ListPlaceholder,
  ListSearchParameter,
  ListSortingParameter,
  TextFieldChangePasswordList,
  TextFieldsNameAttributeList,
} from '@/lib/constants/text-const'

// Import of Prisma models used to extend field types
import { Task, User } from '@prisma/client'

/**
 * A utility generic type that extracts all possible values (union of literal types)
 * from an object defined with `as const`.
 * For example, for `const obj = { a: 'A', b: 'B' } as const`, `ValueOf<typeof obj>`
 * would be of type `'A' | 'B'`.
 */
export type ValueOf<T> = T[keyof T]

/**
 * Type representing possible values for button names.
 * Generated from `ListBtnNames` in the constants file.
 */
export type ListBtnNamesValue = ValueOf<typeof ListBtnNames>

/**
 * Type representing possible values for form names (titles).
 * Generated from `ListFormNames` in the constants file.
 */
export type ListFormNamesValue = ValueOf<typeof ListFormNames>

/**
 * Type representing possible values for input field labels and other UI elements.
 * Generated from `ListLabels` in the constants file.
 */
export type ListLabelsValue = ValueOf<typeof ListLabels>

/**
 * Type representing possible values for error messages and failure statuses.
 * Generated from `ListError` in the constants file.
 */
export type ListErrorValue = ValueOf<typeof ListError>

/**
 * Type representing possible values for chip names (status/priority filters).
 * Generated from `ListChipNames` in the constants file.
 */
export type ListChipNamesValue = ValueOf<typeof ListChipNames>

/**
 * Type representing possible values for input field placeholders.
 * Generated from `ListPlaceholder` in the constants file.
 */
export type ListPlaceholderValue = ValueOf<typeof ListPlaceholder>

/**
 * Type representing possible values for general application phrases and messages.
 * Generated from `ListPhrases` in the constants file.
 */
export type ListPhrasesValue = ValueOf<typeof ListPhrases>

/**
 * Type representing possible values for URL search parameter keys.
 * Generated from `ListSearchParameter` in the constants file.
 */
export type ListSearchParameterValue = ValueOf<typeof ListSearchParameter>

/**
 * Type representing possible values for default search parameters.
 * Generated from `ListDefaultSearchParameter` in the constants file.
 */
export type ListDefaultSearchParameterValue = ValueOf<
  typeof ListDefaultSearchParameter
>

/**
 * A union type representing all possible keys that can be used
 * as `name` attributes for input fields in forms.
 * Includes:
 * - Keys of fields specific to the password change form (`TextFieldChangePasswordList`).
 * - Keys of `Task` model properties (if they are used as field names).
 * - Keys of `User` model properties (if they are used as field names).
 * This ensures comprehensive typing for all field names in the application.
 */
export type TextFieldsNameAttributeKeys =
  | keyof typeof TextFieldChangePasswordList
  | keyof Task
  | keyof User

/**
 * Type representing possible values for the `name` attributes of input fields.
 * Generated from `TextFieldsNameAttributeList` in the constants file,
 * which in turn includes all keys from `TextFieldsNameAttributeKeys`.
 * This type ensures that the `name` values of fields are valid.
 */
export type TextFieldsNameAttributeListValue = ValueOf<
  typeof TextFieldsNameAttributeList
>

/**
 * Type representing possible values for task sorting parameters.
 * Generated from `ListSortingParameter` in the constants file.
 */
export type ListSortingParameterValue = ValueOf<typeof ListSortingParameter>
