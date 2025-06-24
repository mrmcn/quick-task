import { TextFieldsNameAttributeListValue } from '@/lib/constants/type'
import { TaskListDto } from '@/lib/repositories/prisma/tasks'
import { ActionProps, StateProps } from '@/lib/services/actions/types'
import { ResponseObject, UserTasksResult } from '@/lib/services/queries/types'
import { SearchParamsObject } from '@/lib/utils/helpers/get-search-params'
import { RenderProps } from '@/ui/common/forms/text-fields/types'
import { TasksDataPromise } from '@/ui/types'
import { TypographyVariant } from '@mui/material'

export interface TasksListProps {
  searchParamsObject?: SearchParamsObject
}

export interface TasksItemsProps extends TasksListProps, TasksDataPromise {}

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
  action: ActionProps<StateProps>
}

export interface WithTaskIdProps {
  taskId: TaskListDto['id']
}

export interface DeleteTaskProps extends WithTaskIdProps {
  searchParamsToGoBack: string
}

export interface HiddenInputsProps extends WithTaskIdProps {
  dynamicField: { name: string; value: string }
}

export type EditStatusFormProps = Pick<TaskListDto, 'id' | 'status' | 'title'>

export type EditedComponentProps = Omit<
  TaskEditableProps,
  'typographyVariant' | 'action'
>
