import { TextFieldsNameAttributeListValue } from '@/lib/constants/type'
import { HandleError } from '@/lib/utils/error-handling/type'

export type StateProps =
  | { status: 'success' }
  | { status: 'error'; error: HandleError }
  | undefined // undefined is the type of initialState with useActionState '@/ui/common/form-wrapper/with-action'

export type ActionProps<T> = (
  state: Awaited<T>,
  payload: FormData,
) => T | Promise<T>

export type FieldNameAttribute = Extract<
  TextFieldsNameAttributeListValue,
  'email' | 'name'
>
