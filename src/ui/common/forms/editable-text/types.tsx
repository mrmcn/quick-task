import { TextFieldsNameAttributeListValue } from '@/lib/constants/type'
import { TaskListDto, UserListDto } from '@/lib/db/selects'
import { ActionHandler, ActionResult, FetchData } from '@/lib/services/types'
import { RenderProps } from '@/ui/common/forms/types'
import { TypographyProps } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

export interface EditableTextProps extends BaseEditableTextProps {
  renderViewText: RenderViewText
}
interface BaseEditableTextProps {
  data: Data
  action: ActionHandler<ActionResult>
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
  action: ActionHandler<ActionResult>
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
