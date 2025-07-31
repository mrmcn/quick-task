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
import { RenderProps } from '@/ui/common/forms/types'
import { TypographyVariant } from '@mui/material'

interface SearchParamsToGoBack {
  searchParamsToGoBack: string
}
interface Authenticated {
  authenticated: boolean
}

export interface WithTaskProps {
  task: TaskListDto
}

export interface AuthAndTask extends Authenticated, WithTaskProps {}

export interface ListItemContentProps
  extends SearchParamsToGoBack,
    AuthAndTask {}

export interface TasksListProps {
  searchParamsObject?: SearchParamsObject
}

export interface TasksItemsProps extends TasksListProps, UserTasksPromise {}

export type EmptyStateProps = TasksListProps & ResponseObject<UserTasksResult>

export interface TaskItem extends TasksListProps, AuthAndTask {}

export interface TaskEditableProps
  extends RenderProps,
    WithTaskProps,
    SearchParamsToGoBack {
  fieldName: Extract<TextFieldsNameAttributeListValue, 'title' | 'details'>
  fontSize: string
  typographyVariant: TypographyVariant
  action: ActionHandler<ActionResult>
}

export interface WithTaskIdProps {
  taskId: TaskListDto['id']
}

export interface DeleteTaskProps
  extends WithTaskIdProps,
    SearchParamsToGoBack,
    Authenticated {}

export interface HiddenInputsProps extends WithTaskIdProps {
  dynamicField: { name: string; value: string }
}

export type EditStatusFormProps = Pick<TaskListDto, 'id' | 'status'> & {
  ariaLabelledById: string
}
