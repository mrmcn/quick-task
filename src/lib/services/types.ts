import { AuthListDto, TaskListDto } from '@/lib/db/selects'
import { HandleError } from '@/lib/utils/error-handling/type'
import { SearchParamsObject } from '@/lib/utils/helpers/get-search-params'
import { Prisma, Status, User } from '@prisma/client'

export type FetchData<T> = Promise<ResponseObject<T>>

export type ResponseObject<T> =
  | { data: T; error?: undefined }
  | { error: HandleError; data?: undefined }

export interface UserTasksResult {
  tasks: TaskListDto[]
  totalPages: number
}

export interface MonitoringStatesProps {
  [Status.completed]: number
  [Status.in_progress]: number
}

export interface FetchTask {
  statusCounts(): FetchData<MonitoringStatesProps>
  userTasksData(
    searchParamsObject?: SearchParamsObject,
  ): FetchData<UserTasksResult>
}

export interface FetchUser {
  authData(email: User['email']): FetchData<AuthListDto>
  uniqueData<K extends Prisma.UserSelect>(
    select: K,
  ): FetchData<
    Prisma.UserGetPayload<{
      select: K
    }>
  >
}

export type StateProps =
  | { status: 'success' }
  | { status: 'error'; error: HandleError }
  | undefined // undefined is the type of initialState with useActionState '@/ui/common/form-wrapper/with-action'

export type ActionProps<T> = (
  state: Awaited<T>,
  payload: FormData,
) => T | Promise<T>
