import { Task, User } from '@prisma/client'

export const ListBtnNames = {
  back: 'Go back',
  deleteAccount: 'Delete account',
  deleteTask: 'Delete',
  cancel: 'Cancel',
  newestToOldest: 'Newest to oldest',
  ok: 'Great!',
  oldestToNewest: 'Oldest to newest',
  resetPassword: 'Reset password',
  signup: 'Sign up',
  signin: 'Sign in',
  signout: 'Sign out',
  save: 'Save',
  titleAtoZ: 'Title A to Z',
  titleZtoA: 'Title Z to A',
} as const

export type ListBtnNamesValue = ValueOf<typeof ListBtnNames>

export const ListFormNames = {
  createTask: 'Create task',
  editUserName: 'Edit user name',
  editEmail: 'Edit email',
  resetPassword: 'Reset password',
  signin: 'Sign in',
  signup: 'Create account',
  updateTask: 'Edit task',
} as const

export type ListFormNamesValue = ValueOf<typeof ListFormNames>

export const ListLabels = {
  confirmNewPassword: 'Confirm new password',
  currentPassword: 'Current password',
  email: 'Email',
  password: 'Password',
  name: 'Name',
  newPassword: 'New password',
  title: 'Title',
  details: 'Details',
  search: 'Search',
  sortBy: 'Sort by',
} as const

export type ListLabelsValue = ValueOf<typeof ListLabels>

export const ListError = {
  dataError: 'Data retrieval error',
  errorInField: 'Error in field',
  error: 'error',
  incorrectParameter: 'Incorrect page parameter',
  noData: 'no data',
  failed: 'Failed',
} as const

export type ListErrorValue = ValueOf<typeof ListError>

export const ListChipNames = {
  completed: 'Completed',
  pending: 'Pending',
  priorityHigh: 'Priority high',
  priorityLow: 'Priority low',
} as const

export type ListChipNamesValue = ValueOf<typeof ListChipNames>

export const ListPlaceholder = {
  enterEmail: 'Enter your email address',
  enterPassword: 'Enter your password',
  createPassword: 'Create a strong password',
  createTitle: 'Create a task title',
  createDetails: 'Describe the details of the task',
  search: 'Search task...',
} as const

export type ListPlaceholderValue = ValueOf<typeof ListPlaceholder>

export const ListPhrases = {
  createNewTask: 'This is empty for now. Create a new task.',
  deleteAccount: 'Delete account',
  editUserName: 'Edit user name',
  high: 'high',
  quickTask: 'QUICK TASK',
  low: 'low',
  passwordChanged: 'Password changed successfully!',
  priority: 'Priority',
  // resetPasswordTitle: 'Reset password',
  // resetPasswordContent:
  //   'For the security of your account, kindly enter the new password you would like to use. Please make sure that the password is secure (includes letters, numbers, and symbols) and differs from your previous passwords.',
  signoutTitle: 'Log out!',
  signoutContent: 'Do you really want to log out?',
  newTaskDialogText: 'Successfully created task!',
  taskNoFound: 'No such task found.',
  tasksPerPage: 'Tasks per page',
  user: 'User',
  userDeleteTitle: 'Account deletion!',
  userDeleteContent:
    'Are you sure? This action cannot be undone. All user data will be lost forever.',
} as const

export type ListPhrasesValue = ValueOf<typeof ListPhrases>

export const ListSearchParameter = {
  query: 'query',
  page: 'page',
  sorting: 'sorting',
  status: 'status',
  priority: 'priority',
} as const

export type ListSearchParameterValue = ValueOf<typeof ListSearchParameter>

export const ListDefaultSearchParameter = {
  defaultQuery: '',
  defaultSort: '{}',
  defaultPage: '1',
  defaultStatus: undefined,
  defaultPriority: undefined,
} as const

export type ListDefaultSearchParameterValue = ValueOf<
  typeof ListDefaultSearchParameter
>

export const ListSortingParameter = {
  titleAsc: 'title asc',
  titleDesc: 'title desc',
  dateAsc: 'date asc',
  dateDesc: 'date desc',
} as const

export type ListSortingParameterValue = ValueOf<typeof ListSortingParameter>

// Each MenuItem has a "value" attribute consisting of two parts separated by a space:
// 1. The first part is the field name of the 'Task' PrismaORM model (e.g., 'title', 'date').
// 2. The second part is the PrismaORM sorting argument (e.g., 'asc', 'desc').
// Other "value" options are possible that correspond to PrismaORM sorting queries.
export const sortOptionsConfig = [
  { value: ListSortingParameter.titleAsc, content: ListBtnNames.titleAtoZ },
  { value: ListSortingParameter.titleDesc, content: ListBtnNames.titleZtoA },
  {
    value: ListSortingParameter.dateDesc,
    content: ListBtnNames.newestToOldest,
  },
  { value: ListSortingParameter.dateAsc, content: ListBtnNames.oldestToNewest },
] as const

// Keys for the change password form fields. Used solely for type definitions.
export const TextFieldChangePasswordList = {
  confirmNewPassword: 'confirmNewPassword',
  currentPassword: 'currentPassword',
  newPassword: 'newPassword',
} as const
type TextFieldsNameAttributeKeys =
  | keyof typeof TextFieldChangePasswordList
  | keyof Task
  | keyof User

export const TextFieldsNameAttributeList: {
  [key in TextFieldsNameAttributeKeys]: key
} = {
  id: 'id',
  title: 'title',
  details: 'details',
  date: 'date',
  priority: 'priority',
  status: 'status',
  authorId: 'authorId',
  email: 'email',
  name: 'name',
  password: 'password',
  tasksPerPage: 'tasksPerPage',
  confirmNewPassword: 'confirmNewPassword',
  currentPassword: 'currentPassword',
  newPassword: 'newPassword',
} as const

export type TextFieldsNameAttributeListValue = ValueOf<
  typeof TextFieldsNameAttributeList
>

export const RedirectName = {
  redirectTo: 'redirectTo',
} as const

type ValueOf<T> = T[keyof T]
