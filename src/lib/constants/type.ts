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
import { Task, User } from '@prisma/client'

export type ValueOf<T> = T[keyof T]

export type ListBtnNamesValue = ValueOf<typeof ListBtnNames>

export type ListFormNamesValue = ValueOf<typeof ListFormNames>

export type ListLabelsValue = ValueOf<typeof ListLabels>

export type ListErrorValue = ValueOf<typeof ListError>

export type ListChipNamesValue = ValueOf<typeof ListChipNames>

export type ListPlaceholderValue = ValueOf<typeof ListPlaceholder>

export type ListPhrasesValue = ValueOf<typeof ListPhrases>

export type ListSearchParameterValue = ValueOf<typeof ListSearchParameter>

export type ListDefaultSearchParameterValue = ValueOf<
  typeof ListDefaultSearchParameter
>

export type TextFieldsNameAttributeKeys =
  | keyof typeof TextFieldChangePasswordList
  | keyof Task
  | keyof User

export type TextFieldsNameAttributeListValue = ValueOf<
  typeof TextFieldsNameAttributeList
>

export type ListSortingParameterValue = ValueOf<typeof ListSortingParameter>
