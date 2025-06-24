import { FetchData, UserTasksResult } from '@/lib/services/queries/types'

export interface TasksDataPromise {
  tasksDataPromise: FetchData<UserTasksResult>
}
