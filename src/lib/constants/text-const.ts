export const FormButtonName = {
  signIn: 'Sign in',
  save: 'Save',
} as const

export type FormButtonNameProps =
  (typeof FormButtonName)[keyof typeof FormButtonName]

export const ButtonName = {
  deleteAccount: 'Delete account',
  deleteTask: 'Delete task',
  cancel: 'Cancel',
  signup: 'Sign up',
} as const

export type ButtonNameProps =
  (typeof FormButtonName)[keyof typeof FormButtonName]

export const FormName = {
  editUserName: 'Edit user name',
  editEmail: 'Edit email',
  resetPassword: 'Reset password',
  signin: 'Sign in',
  signup: 'Create account',
  updateTask: 'Edit task',
  createTask: 'Create task',
} as const

export type FormNameProps = (typeof FormName)[keyof typeof FormName]

export const PasswordInputType = {
  text: 'text',
  password: 'password',
} as const

export type PasswordInputTypeProps =
  (typeof PasswordInputType)[keyof typeof PasswordInputType]

export const TextFieldLabel = {
  email: 'Email',
  password: 'Password',
  name: 'Name',
  summary: 'Title',
  details: 'Details',
} as const

export type TextFieldLabelProps =
  (typeof TextFieldLabel)[keyof typeof TextFieldLabel]

export const ListError = {
  noData: 'no data',
  errorInField: 'Error in field',
  error: 'error',
  dataError: 'Data retrieval error',
} as const

export type ListErrorProps = (typeof ListError)[keyof typeof ListError]

export const MonitoringCardName = {
  completed: 'Completed tasks',
  pending: 'Pending tasks',
  progress: 'Progress, %',
} as const

export type MonitoringCardNameProps =
  (typeof MonitoringCardName)[keyof typeof MonitoringCardName]

export const Phrases = {
  createNewTask: 'This is empty for now. Create a new task.',
  deleteAccount: 'Delete account',
  editEmail: 'Edit email',
  enterEmail: 'Enter your email address',
  enterPassword: 'Enter password',
  editUserName: 'Edit user name',
  high: 'high',
  quickTask: 'QUICK TASK',
  loggingIn: 'Logging in...',
  logoutIn: 'Logout in progress',
  low: 'low',
  priority: 'Priority',
  user: 'User',
  userDeleteText:
    'Are you sure? This action cannot be undone. All user data will be lost forever.',
} as const

export type PhrasesProps = (typeof Phrases)[keyof typeof Phrases]
