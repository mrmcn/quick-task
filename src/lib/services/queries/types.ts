import { TaskListDto } from '@/lib/repositories/prisma/tasks'
import { HandleError } from '@/lib/utils/error-handling/type'
import { SearchParamsObject } from '@/lib/utils/helpers/get-search-params'
import { Status, User } from '@prisma/client'

export type FetchData<T> = Promise<
  { data: T; error?: undefined } | { error: HandleError; data?: undefined }
>

export interface UserTasksResult {
  tasks: TaskListDto[]
  totalPages: number
}

export interface MonitoringStatesProps {
  [Status.completed]: number
  [Status.in_progress]: number
}

export type ScalarUserFields = keyof User
export type UserFieldType<K extends ScalarUserFields> = User[K]
export type FetchUniqueUserData<K extends ScalarUserFields> = FetchData<
  UserFieldType<K>
>

export interface FetchTask {
  statusCounts(): FetchData<MonitoringStatesProps>
  userTasksData(
    searchParamsObject?: SearchParamsObject,
  ): FetchData<UserTasksResult>
}

export interface FetchUser {
  allData(email: User['email']): FetchData<User>
  uniqueData<K extends ScalarUserFields>(param: K): FetchUniqueUserData<K>
}
