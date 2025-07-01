import { TextFieldsNameAttributeListValue } from '@/lib/constants/type'
import { TaskListDto, UserListDto } from '@/lib/db/selects'
import { ActionProps, FetchData, StateProps } from '@/lib/services/types'
import { RenderProps } from '@/ui/common/forms/text-fields/types'
import { TypographyProps } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

export interface EditableTextProps extends BaseEditableTextProps {
  renderViewText: RenderViewText
}
interface BaseEditableTextProps {
  data: Data
  action: ActionProps<StateProps>
  renderEditedText: (props: RenderProps) => React.ReactNode
}

export type Data = TaskDataType | PromiseObjectWithKey<keyof UserListDto>
interface PromiseObjectWithKey<K extends keyof UserListDto> {
  key: K
  promise: FetchData<UserListDto>
}

export type RenderViewText = (
  props: TypographyProps,
  viewData: Content,
) => React.JSX.Element

type TaskDataType = TaskListDto['details' | 'title']

export interface EditableUserDataProps {
  userDataPromise: FetchData<UserListDto>
  fieldName: FieldNameAttribute
  action: ActionProps<StateProps>
}

export interface TextEditingProps extends BaseEditableTextProps {
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

type FieldNameAttribute = Extract<
  TextFieldsNameAttributeListValue,
  keyof UserListDto
>

export type Content = UserDataType | TaskDataType

type UserDataType = UserListDto[keyof UserListDto]
