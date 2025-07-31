/**
 * This file contains type definitions that ensure strict typing
 * for constants.
 */

// Imports of constants from which type values are generated
import {
  BtnNamesList,
  ChangePasswordList,
  ChipNamesList,
  DefaultSearchParameterList,
  ErrorList,
  FormNamesList,
  LabelsList,
  NameAttributeList,
  PhrasesList,
  PlaceholderList,
  SearchParameterList,
  SortingParameterList,
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
export type ListBtnNamesValue = ValueOf<typeof BtnNamesList>

/**
 * Type representing possible values for form names (titles).
 * Generated from `ListFormNames` in the constants file.
 */
export type ListFormNamesValue = ValueOf<typeof FormNamesList>

/**
 * Type representing possible values for input field labels and other UI elements.
 * Generated from `ListLabels` in the constants file.
 */
export type ListLabelsValue = ValueOf<typeof LabelsList>

/**
 * Type representing possible values for error messages and failure statuses.
 * Generated from `ListError` in the constants file.
 */
export type ListErrorValue = ValueOf<typeof ErrorList>

/**
 * Type representing possible values for chip names (status/priority filters).
 * Generated from `ListChipNames` in the constants file.
 */
export type ListChipNamesValue = ValueOf<typeof ChipNamesList>

/**
 * Type representing possible values for input field placeholders.
 * Generated from `ListPlaceholder` in the constants file.
 */
export type ListPlaceholderValue = ValueOf<typeof PlaceholderList>

/**
 * Type representing possible values for general application phrases and messages.
 * Generated from `ListPhrases` in the constants file.
 */
export type ListPhrasesValue = ValueOf<typeof PhrasesList>

/**
 * Type representing possible values for URL search parameter keys.
 * Generated from `ListSearchParameter` in the constants file.
 */
export type ListSearchParameterValue = ValueOf<typeof SearchParameterList>

/**
 * Type representing possible values for default search parameters.
 * Generated from `ListDefaultSearchParameter` in the constants file.
 */
export type ListDefaultSearchParameterValue = ValueOf<
  typeof DefaultSearchParameterList
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
  | keyof typeof ChangePasswordList
  | keyof Task
  | keyof User

/**
 * Type representing possible values for the `name` attributes of input fields.
 * Generated from `TextFieldsNameAttributeList` in the constants file,
 * which in turn includes all keys from `TextFieldsNameAttributeKeys`.
 * This type ensures that the `name` values of fields are valid.
 */
export type TextFieldsNameAttributeListValue = ValueOf<typeof NameAttributeList>

/**
 * Type representing possible values for task sorting parameters.
 * Generated from `ListSortingParameter` in the constants file.
 */
export type ListSortingParameterValue = ValueOf<typeof SortingParameterList>
