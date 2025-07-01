import { FetchData, UserTasksResult } from '@/lib/services/types'

export interface TasksDataPromise {
  tasksDataPromise: FetchData<UserTasksResult>
}
