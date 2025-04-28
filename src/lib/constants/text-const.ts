import { Priority, Status, Task } from '@prisma/client'

export const ListBtnNames = {
  back: 'Go back',
  deleteAccount: 'Delete account',
  deleteTask: 'Delete',
  cancel: 'Cancel',
  newestToOldest: 'Newest to oldest',
  oldestToNewest: 'Oldest to newest',
  signup: 'Sign up',
  signIn: 'Sign in',
  signout: 'Sign out',
  save: 'Save',
  titleAtoZ: 'Title A to Z',
  titleZtoA: 'Title Z to A',
} as const

export type ListBtnNamesProps = (typeof ListBtnNames)[keyof typeof ListBtnNames]

export const ListFormNames = {
  editUserName: 'Edit user name',
  editEmail: 'Edit email',
  resetPassword: 'Reset password',
  signin: 'Sign in',
  signup: 'Create account',
  updateTask: 'Edit task',
  createTask: 'Create task',
} as const

export type ListFormNamesProps =
  (typeof ListFormNames)[keyof typeof ListFormNames]

export const PasswordInputType = {
  text: 'text',
  password: 'password',
} as const

export type PasswordInputTypeProps =
  (typeof PasswordInputType)[keyof typeof PasswordInputType]

export const ListLabelName = {
  email: 'Email',
  password: 'Password',
  name: 'Name',
  title: 'Title',
  details: 'Details',
  search: 'Search',
  sortBy: 'Sort by',
} as const

export type ListLabelNameProps =
  (typeof ListLabelName)[keyof typeof ListLabelName]

export const ListError = {
  dataError: 'Data retrieval error',
  errorInField: 'Error in field',
  error: 'error',
  incorrectParameter: 'Incorrect page parameter',
  noData: 'no data',
} as const

export type ListErrorProps = (typeof ListError)[keyof typeof ListError]

export const ListChipNames = {
  completed: 'Completed',
  pending: 'Pending',
  priorityHigh: 'Priority high',
  priorityLow: 'Priority low',
} as const

export type ListChipNamesProps =
  (typeof ListChipNames)[keyof typeof ListChipNames]

export const ListPlaceholder = {
  enterEmail: 'Enter your email address',
  enterPassword: 'Enter your password',
  createPassword: 'Create a strong password',
  createTitle: 'Create a task title',
  createDetails: 'Describe the details of the task',
  search: 'Search task...',
} as const

export type ListPlaceholderProps =
  (typeof ListPlaceholder)[keyof typeof ListPlaceholder]

export const ListPhrases = {
  createNewTask: 'This is empty for now. Create a new task.',
  deleteAccount: 'Delete account',
  editUserName: 'Edit user name',
  high: 'high',
  quickTask: 'QUICK TASK',
  low: 'low',
  priority: 'Priority',
  signout1: 'Log out!',
  signout2: 'Do you really want to log out?',
  taskNoFound: 'No such task found.',
  user: 'User',
  userDeleteText1: 'Account deletion!',
  userDeleteText2:
    'Are you sure? This action cannot be undone. All user data will be lost forever.',
} as const

export type ListPhrasesProps = (typeof ListPhrases)[keyof typeof ListPhrases]

export const ListLoadingIndicator = {
  loggingIn: 'Logging in...',
  logoutIn: 'Logout in progress',
  creating: 'Creating...',
  deleting: 'Deleting a task',
  updata: 'Task update',
  updataUser: 'Updating data',
} as const

export type ListLoadingIndicatorProps =
  (typeof ListLoadingIndicator)[keyof typeof ListLoadingIndicator]

export const ListSearchParameter = {
  query: 'query',
  page: 'page',
  sorting: 'sorting',
  status: 'status',
  priority: 'priority',
} as const

export type ListSearchParameterProps =
  (typeof ListSearchParameter)[keyof typeof ListSearchParameter]

export const ListDefaultSearchParameter = {
  defaultQuery: '',
  defaultSort: '{}',
  defaultPage: '1',
  defaultStatus: undefined,
  defaultPriority: undefined,
} as const

export type ListDefaultSearchParameterProps =
  (typeof ListDefaultSearchParameter)[keyof typeof ListDefaultSearchParameter]

export const ListSortingParameter = {
  titleAsc: 'title asc',
  titleDesc: 'title desc',
  dateAsc: 'date asc',
  dateDesc: 'date desc',
} as const

export type ListSortingParameterProps =
  (typeof ListSortingParameter)[keyof typeof ListSortingParameter]

type TaskKeys = keyof Task
export const ListTaskField: { [key in TaskKeys]: key } = {
  id: 'id',
  title: 'title',
  details: 'details',
  date: 'date',
  priority: 'priority',
  status: 'status',
  authorId: 'authorId',
} as const

export const ListPriorityField: { [key in Priority]: key } = {
  high: 'high',
  low: 'low',
}

export const ListStatusField: { [key in Status]: key } = {
  completed: 'completed',
  in_progress: 'in_progress',
}
