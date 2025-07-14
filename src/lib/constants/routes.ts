/**
 * The `PAGES` object contains constants for all main routes (URL paths) in the application.
 */
export const PAGES = {
  /**
   * The main (root) page of the application (`/`).
   * This is the **starting and only accessible page for unauthenticated users**.
   * It displays a list of tasks with sample (demonstration) data
   * and includes a link to the login page.
   * Authenticated users are redirected from this page to the dashboard.
   */
  HOME: '/',
  /**
   * The path to the new user registration page.
   * This page allows visitors to create a new account by
   * providing an email and password. It uses `Next.js Server Actions`
   * to handle the registration form submission.
   */
  SIGNUP: '/signup',
  /**
   * The path to the login page for existing users.
   * This page allows users to authenticate using
   * email and password, utilizing `Next.js Server Actions`
   * for handling the authentication form.
   */
  SIGNIN: '/signin',
  /**
   * The path to the user profile settings page.
   * On this page, authenticated users can **view and manage**
   * their personal data, such as name and email (using `EditableListItem`),
   * as well as change their password, configure the number of items per page,
   * sign out, and delete their account.
   */
  USER: '/user',
  /**
   * The path to the user password change (reset) page.
   * This page allows authenticated users to update their password,
   * requiring the entry of the current password, a new password, and its confirmation.
   * A confirmation modal is displayed after a successful change.
   */
  USER_RESET_PASSWORD: '/user/reset-password',
  /**
   * The path to the main dashboard for authenticated users.
   * This page displays the user's personalized task list and
   * allows them to **view, create, edit, delete**, search, filter,
   * and sort tasks using relevant UI elements (search bar,
   * filter chips, and sort selector).
   */
  DASHBOARD: '/dashboard',
  /**
   * The path to the new task creation page on the dashboard.
   * This page provides a form for entering the **title and details of a new task**,
   * using `Next.js Server Actions` to submit and save the data.
   */
  DASHBOARD_CREATE: '/dashboard/create',
}
