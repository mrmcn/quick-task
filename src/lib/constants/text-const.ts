/**
 * This file centralizes text constants used throughout the application.
 */

import { TextFieldsNameAttributeKeys } from '@/lib/constants/type' // Assumed to be imported for type definitions

/**
 * The `BtnNamesList` object contains textual names for buttons used throughout the application.
 *
 * These constants serve multiple purposes, including:
 * - **Displaying consistent button text:** Ensures unified and clear labels across the UI.
 * - **Enforcing type safety:** Helps ensure button components only accept predefined names.
 * - **Improving accessibility:** Can be utilized for `aria-label` attributes.
 * - **Facilitating localization:** Centralizes texts for easier translation.
 */
export const BtnNamesList = {
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
  signIntoDelete: 'Sign In to Delete',
} as const

/**
 * The `FormNamesList` object contains textual names/titles for various forms in the application.
 *
 * These constants are used for:
 * 1.  **Displaying form titles:** Provides unified titles for each form on respective pages.
 * 2.  **Identifying forms:** Helps distinguish forms in logic or for analytics.
 * 3.  **Typing props:** Ensures that form components only accept allowed form names.
 */
export const FormNamesList = {
  createTask: 'Create task',
  editUserName: 'Edit user name',
  editEmail: 'Edit email',
  resetPassword: 'Reset password',
  signin: 'Sign in',
  signup: 'Create account',
  updateTask: 'Edit task',
} as const

/**
 * The `LabelsList` object contains textual labels for input fields (TextFields)
 * and other control elements in the UI.
 *
 * These constants are used for:
 * 1.  **Displaying text above fields:** Provides clear labels for input fields (e.g., "Email", "Password").
 * 2.  **Validation and error handling:** Can be used in validation schemas (e.g., Zod) to link errors to specific fields.
 * 3.  **Typing props:** Ensures that field components only accept allowed labels.
 */
export const LabelsList = {
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

/**
 * The `ErrorList` object contains standardized error messages and failure statuses.
 *
 * These constants are used for:
 * 1.  **Displaying error messages to the user:** Provides unified and clear messages when issues arise.
 * 2.  **Fallback values:** Can be used as default values if data could not be retrieved.
 * 3.  **Identifying error types:** Helps distinguish error types for appropriate handling.
 */
export const ErrorList = {
  dataError: 'Data retrieval error',
  errorInField: 'Error in field',
  error: 'error',
  incorrectParameter: 'Incorrect page parameter',
  noData: 'no data',
  failed: 'Failed',
  paginationError:
    'A pagination error occurred. Please try refreshing the page.',
  validationError: 'The current password entered is incorrect.',
} as const

/**
 * The `ChipNamesList` object contains textual names for "chip" components.
 *
 * These constants are used for:
 * 1.  **Displaying text on chips:** Provides unified and clear names for chips used for filtering or displaying status/priority.
 * 2.  **Typing props:** Ensures that chip components only accept allowed names.
 */
export const ChipNamesList = {
  completed: 'Completed',
  pending: 'Pending',
  priorityHigh: 'Priority high',
  priorityLow: 'Priority low',
} as const

/**
 * The `PlaceholderList` object contains textual placeholders for input fields (TextFields).
 *
 * These constants are used for:
 * 1.  **Providing hints in fields:** Displays text inside empty fields, suggesting to the user what is expected.
 * 2.  **Typing props:** Ensures that field components only accept allowed placeholders.
 */
export const PlaceholderList = {
  enterEmail: 'Enter your email address',
  enterPassword: 'Enter your password',
  createPassword: 'Create a strong password',
  createTitle: 'Create a task title',
  createDetails: 'Describe the details of the task',
  search: 'Search task...',
} as const

/**
 * The `PhrasesList` object contains general textual phrases, messages, and titles.
 *
 * These constants are used for:
 * 1.  **Titles and dialog content:** Provides unified titles and messages for modal windows.
 * 2.  **Application/page titles:** Defines names for main UI elements, such as the application name.
 * 3.  **Empty state messages:** Provides text displayed when data is absent or not found.
 * 4.  **Settings list items:** Defines text for menu items or user settings.
 */
export const PhrasesList = {
  createNewTask: 'This is empty for now. Create a new task.',
  deleteAccount: 'Delete account',
  editUserName: 'Edit user name',
  high: 'high',
  quickTask: 'QUICK TASK',
  low: 'low',
  passwordChanged: 'Password changed successfully!',
  priority: 'Priority',
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

/**
 * The `SortingParameterList` object contains textual values for task sorting parameters.
 *
 * Each value corresponds to a sorting option and consists of two parts separated by a space:
 * 1. The first part is the field name of the 'Task' PrismaORM model (e.g., 'title', 'date').
 * 2. The second part is the PrismaORM sorting argument (e.g., 'asc', 'desc').
 *
 * These constants are used for:
 * 1.  **Forming URL sorting parameters:** Values are used in the URL to define the sorting order.
 * 2.  **Displaying sorting options:** The constant's text can be displayed to the user in the interface (e.g., in sorting dropdowns).
 */
export const SortingParameterList = {
  titleAsc: 'title asc',
  titleDesc: 'title desc',
  dateAsc: 'date asc',
  dateDesc: 'date desc',
} as const

/**
 * The `SearchParameterList` object contains constants for **URL query parameter keys**.
 *
 * These constants are used for:
 * 1.  **Building and parsing URLs:** Allow consistent work with URL query parameters
 * (e.g., `?page=2`, `?query=some-text`, `?sorting=date%20desc`).
 * 2.  **Data Filtering:** Define keys for filtering parameters like `status` and `priority`.
 * 3.  **Data Sorting:** Define the key for the sorting parameter (`sorting`).
 * 4.  **Pagination:** Defines the key for the current page parameter (`page`).
 * 5.  **Searching:** Defines the key for the search query parameter (`query`).
 *
 * Using these constants ensures consistency and prevents "magic strings" when working with URLs.
 */
export const SearchParameterList = {
  /** URL parameter key for the search query. */
  query: 'query',
  /** URL parameter key for the current pagination page. */
  page: 'page',
  /** URL parameter key for task sorting. */
  sort: 'sort',
  /** URL parameter key for filtering by task status. */
  status: 'status',
  /** URL parameter key for filtering by task priority. */
  priority: 'priority',
} as const

/**
 * The `DefaultSearchParameter` object contains constants that define
 * **default values for URL search parameters**.
 *
 * These values are used when a specific search parameter is absent
 * from the URL query string, providing a consistent and predictable initial state
 * for data filtering, sorting, and pagination.
 */
export const DefaultSearchParameterList = {
  defaultQuery: '',
  defaultSort: SortingParameterList.dateAsc,
  defaultPage: '1',
  defaultStatus: undefined,
  defaultPriority: undefined,
} as const

/**
 * The `ChangePasswordList` object contains **keys for the change password form fields**.
 *
 * These constants are used primarily for **type definitions**,
 * specifically for unionizing with other keys in `TextFieldsNameAttributeKeys`.
 * They ensure strict typing and consistency of these field names,
 * allowing for easy referencing in validation schemas or other type definitions.
 */
export const ChangePasswordList = {
  confirmNewPassword: 'confirmNewPassword',
  currentPassword: 'currentPassword',
  newPassword: 'newPassword',
} as const

/**
 * The `NameAttributeList` object contains **all possible values for the `name` attribute**
 * of input fields (TextFields) in the application.
 *
 * This list provides:
 * 1.  **Consistency in field names:** Centralized definition of names prevents discrepancies
 * and errors when accessing form field values.
 * 2.  **Strong Typing:** Allows TypeScript to verify the correctness of field names
 * used in form components, validation schemas (e.g., Zod), and server actions.
 * 3.  **Refactoring convenience:** If a field name changes, it only needs to be updated here.
 *
 * Each key of the object is also its value, simplifying usage.
 */
export const NameAttributeList: {
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
  searchParams: 'searchParams',
} as const

/**
 * The `RedirectName` object contains constants used to define
 * **names for redirection parameters**.
 *
 * This ensures:
 * 1.  **Parameter Consistency:** A unified name for the parameter that indicates
 * where the user should be redirected after a certain action (e.g., after login).
 * 2.  **Clarity and Error Prevention:** Avoids the use of "magic strings"
 * when working with redirection logic.
 */
export const RedirectName = {
  redirectTo: 'redirectTo',
} as const
