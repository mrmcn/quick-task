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
  /** Text for a "Go back" button. */
  back: 'Go back',
  /** Text for a "Delete account" button. */
  deleteAccount: 'Delete account',
  /** Text for a generic "Delete" button (e.g., for tasks). */
  deleteTask: 'Delete',
  /** Text for a "Cancel" button. */
  cancel: 'Cancel',
  /** Text for a sorting option: "Newest to oldest". */
  newestToOldest: 'Newest to oldest',
  /** Text for a confirmation button or positive acknowledgment. */
  ok: 'Great!',
  /** Text for a sorting option: "Oldest to newest". */
  oldestToNewest: 'Oldest to newest',
  /** Text for a "Reset password" button. */
  resetPassword: 'Reset password',
  /** Text for a "Sign up" button. */
  signup: 'Sign up',
  /** Text for a "Sign in" button. */
  signin: 'Sign in',
  /** Text for a "Sign out" button. */
  signout: 'Sign out',
  /** Text for a "Save" button. */
  save: 'Save',
  /** Text for a sorting option: "Title A to Z". */
  titleAtoZ: 'Title A to Z',
  /** Text for a sorting option: "Title Z to A". */
  titleZtoA: 'Title Z to A',
  /** Text for a button prompting the user to sign in before they can perform a delete action. */
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
  /** Name for the form to create a new task. */
  createTask: 'Create task',
  /** Name for the form to edit the user's name. */
  editUserName: 'Edit user name',
  /** Name for the form to edit the user's email. */
  editEmail: 'Edit email',
  /** Name for the form to reset or change a user's password. */
  resetPassword: 'Reset password',
  /** Name for the sign-in form. */
  signin: 'Sign in',
  /** Name for the sign-up form. */
  signup: 'Create account',
  /** Name for the form to edit an existing task. */
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
  /** Label for the confirm new password field. */
  confirmNewPassword: 'Confirm new password',
  /** Label for the current password field. */
  currentPassword: 'Current password',
  /** Label for the email input field. */
  email: 'Email',
  /** Label for the password input field. */
  password: 'Password',
  /** Label for the username input field. */
  name: 'Name',
  /** Label for the new password field. */
  newPassword: 'New password',
  /** Label for the task title input field. */
  title: 'Title',
  /** Label for the task details input field. */
  details: 'Details',
  /** Label for the search field. */
  search: 'Search',
  /** Label for the sort by control. */
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
  /** Generic error message indicating a problem with data retrieval or processing. */
  dataError: 'Data retrieval error',
  /** Phrase indicating an error in a specific form field. */
  errorInField: 'Error in field',
  /** Generic short error message. */
  error: 'error',
  /** Error message indicating an invalid or missing page parameter. */
  incorrectParameter: 'Incorrect page parameter',
  /** Message indicating no data is available. */
  noData: 'no data',
  /** Status "Failed" or a general message about an operation failure. */
  failed: 'Failed',
} as const

/**
 * The `ChipNamesList` object contains textual names for "chip" components.
 *
 * These constants are used for:
 * 1.  **Displaying text on chips:** Provides unified and clear names for chips used for filtering or displaying status/priority.
 * 2.  **Typing props:** Ensures that chip components only accept allowed names.
 */
export const ChipNamesList = {
  /** Text for a chip indicating a "Completed" task status. */
  completed: 'Completed',
  /** Text for a chip indicating a "Pending" task status. */
  pending: 'Pending',
  /** Text for a chip indicating "High priority". */
  priorityHigh: 'Priority high',
  /** Text for a chip indicating "Low priority". */
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
  /** Placeholder for the email input field. */
  enterEmail: 'Enter your email address',
  /** Placeholder for the password input field. */
  enterPassword: 'Enter your password',
  /** Placeholder for the new password creation field. */
  createPassword: 'Create a strong password',
  /** Placeholder for the task title creation field. */
  createTitle: 'Create a task title',
  /** Placeholder for the task's detailed description field. */
  createDetails: 'Describe the details of the task',
  /** Placeholder for the search field. */
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
  /** Message encouraging the user to create a new task when the list is empty. */
  createNewTask: 'This is empty for now. Create a new task.',
  /** Text for a button or dialog heading related to deleting an account. */
  deleteAccount: 'Delete account',
  /** Text for an edit user name action or heading. */
  editUserName: 'Edit user name',
  /** Text representing a "high" priority level. */
  high: 'high',
  /** The name of your application or a general phrase for a heading/logo. */
  quickTask: 'QUICK TASK',
  /** Text representing a "low" priority level. */
  low: 'low',
  /** Message confirming a successful password change. */
  passwordChanged: 'Password changed successfully!',
  /** Label or heading for priority selection. */
  priority: 'Priority',
  /** Title for the logout confirmation dialog. */
  signoutTitle: 'Log out!',
  /** Content message for the logout confirmation dialog. */
  signoutContent: 'Do you really want to log out?',
  /** Message confirming successful task creation. */
  newTaskDialogText: 'Successfully created task!',
  /** Message displayed when no tasks are found for a search query. */
  taskNoFound: 'No such task found.',
  /** Label for a setting related to the number of tasks displayed per page. */
  tasksPerPage: 'Tasks per page',
  /** General label for a user. */
  user: 'User',
  /** Title for the account deletion confirmation dialog. */
  userDeleteTitle: 'Account deletion!',
  /** Content message for the account deletion confirmation dialog, emphasizing irreversibility. */
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
  /** Sorting by title in ascending alphabetical order. */
  titleAsc: 'title asc',
  /** Sorting by title in descending alphabetical order. */
  titleDesc: 'title desc',
  /** Sorting by creation date in ascending order (oldest to newest). */
  dateAsc: 'date asc',
  /** Sorting by creation date in descending order (newest to oldest). */
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
  /** Default value for the 'query' URL parameter, representing an empty search query. */
  defaultQuery: '',
  /** Default value for the 'sorting' URL parameter. It's an empty object literal, implying no specific sort order by default or a custom handling. */
  defaultSort: SortingParameterList.dateAsc,
  /** Default value for the 'page' URL parameter, representing the initial page number. */
  defaultPage: '1',
  /** Default value for the 'status' URL parameter. `undefined` suggests no default status filter is applied. */
  defaultStatus: undefined,
  /** Default value for the 'priority' URL parameter. `undefined` suggests no default priority filter is applied. */
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
  /** Key for the "Confirm new password" field. */
  confirmNewPassword: 'confirmNewPassword',
  /** Key for the "Current password" field. */
  currentPassword: 'currentPassword',
  /** Key for the "New password" field. */
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
  /** Unique identifier. */
  id: 'id',
  /** Task name / title. */
  title: 'title',
  /** Task details / description. */
  details: 'details',
  /** Date. */
  date: 'date',
  /** Task priority. */
  priority: 'priority',
  /** Task status. */
  status: 'status',
  /** Author (user) identifier. */
  authorId: 'authorId',
  /** User's email. */
  email: 'email',
  /** User's name. */
  name: 'name',
  /** User's password. */
  password: 'password',
  /** Number of tasks per page (setting). */
  tasksPerPage: 'tasksPerPage',
  /** Confirm new password (for the change password form). */
  confirmNewPassword: 'confirmNewPassword',
  /** Current password (for the change password form). */
  currentPassword: 'currentPassword',
  /** New password (for the change password form). */
  newPassword: 'newPassword',
  /** Key for the hidden field used to pass URL search
   * parameters between pages during Server Actions.
   */
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
  /** The name of the URL parameter indicating the redirection path. */
  redirectTo: 'redirectTo',
} as const
