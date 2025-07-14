/**
 * `DeleteTaskError` is a specialized error class designed for use
 * when issues arise during the process of deleting a task.
 *
 * It extends standard error functionality by adding a specific `type`
 * and an optional `details` field (which defaults to `undefined`), allowing for
 * better categorization and handling of task deletion-related errors.
 */
export class DeleteTaskError {
  /**
   * The specific type of the error, always set to 'delete task'.
   * Used for categorization and filtering errors.
   */
  type: 'delete task'
  /**
   * The error message, providing details about what went wrong.
   */
  message: string
  /**
   * Optional additional details about the error.
   * Defaults to `undefined`. Can be used to extend error information
   * in the future without changing the signature.
   */
  details?: undefined

  /**
   * Creates a new instance of `DeleteTaskError`.
   *
   * @param message The message describing the reason for the task deletion error.
   */
  constructor(message: string) {
    this.message = message
    this.type = 'delete task'
    // Important: Setting the prototype ensures correct `instanceof` behavior.
    Object.setPrototypeOf(this, DeleteTaskError.prototype)
  }
}
