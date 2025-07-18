import { TextFieldsNameAttributeListValue } from '@/lib/constants/type'
import { TaskListDto } from '@/lib/db/selects'
import {
  ActionHandler,
  ActionResult,
  ResponseObject,
  UserTasksPromise,
  UserTasksResult,
} from '@/lib/services/types'
import { SearchParamsObject } from '@/lib/utils/types'
import { RenderProps } from '@/ui/common/forms/text-fields/types'
import { TypographyVariant } from '@mui/material'

export interface TasksListProps {
  searchParamsObject?: SearchParamsObject
}

export interface TasksItemsProps extends TasksListProps, UserTasksPromise {}

export type EmptyStateProps = TasksListProps & ResponseObject<UserTasksResult>

export interface WithTaskProps {
  task: TaskListDto
}

export interface TaskItem extends TasksListProps, WithTaskProps {
  authenticated: boolean
}

export interface TaskEditableProps extends RenderProps, WithTaskProps {
  searchParamsToGoBack: string
  fieldName: Extract<TextFieldsNameAttributeListValue, 'title' | 'details'>
  fontSize: string
  typographyVariant: TypographyVariant
  action: ActionHandler<ActionResult>
}

export interface WithTaskIdProps {
  taskId: TaskListDto['id']
}

export interface DeleteTaskProps extends WithTaskIdProps {
  searchParamsToGoBack: string
  authenticated: boolean
}

export interface HiddenInputsProps extends WithTaskIdProps {
  dynamicField: { name: string; value: string }
}

export type EditStatusFormProps = Pick<TaskListDto, 'id' | 'status' | 'title'>

export type EditedComponentProps = Omit<
  TaskEditableProps,
  'typographyVariant' | 'action'
>
