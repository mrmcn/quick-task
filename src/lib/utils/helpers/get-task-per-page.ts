import { PAGE_VALUE, PageValue } from '@/lib/constants/data/ui-config'
import { fetchUser } from '@/lib/services/queries/user'

/**
 * @function getTaskPerPage
 * @description An asynchronous helper function to retrieve the current user's
 * `tasksPerPage` setting from the database.
 * If the value is missing or invalid, it returns a default value (3).
 *
 * @returns {Promise<PageValue>} The fetched or default `tasksPerPage` value.
 */
export async function getTaskPerPage() {
  // Execute a database query to get only the tasksPerPage field.
  const { data } = await fetchUser.uniqueData({ tasksPerPage: true })
  const taskPerPage = data?.tasksPerPage // Get the value.

  // Check if the retrieved value is included in the list of allowed values.
  if (PAGE_VALUE.includes(taskPerPage as PageValue)) {
    return taskPerPage as PageValue // Return the retrieved value if it's valid.
  } else {
    return 3 // Return the default value if invalid or missing.
  }
}
