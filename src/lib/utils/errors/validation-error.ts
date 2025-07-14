/**
 * `ValidationError` is a specialized error class designed for use
 * when **data validation issues** occur.
 *
 * This class helps to clearly separate validation errors from other types of errors
 * in the application, providing a specific `type` and a `message` field to describe
 * the particular reason for the validation failure.
 *
 * **Important:** This error class is intended for *general* validation scenarios
 * or validation that occurs *outside the scope* of specific libraries like Zod.
 * If you are using Zod for schema validation, it generates its own error types
 * (e.g., `ZodError`), which are handled separately. `ValidationError` can be
 * used for validation performed manually or within logic not covered by Zod schemas.
 */
export class ValidationError {
  /**
   * The specific type of the error, always set to 'validation'.
   * Used for categorization and filtering of validation errors.
   */
  type: 'validation'
  /**
   * The error message, describing in detail why the validation failed.
   */
  message: string
  /**
   * Optional additional details about the error.
   * Defaults to `undefined`. Can be used to add specific
   * validation information (e.g., which field failed validation).
   */
  details?: undefined

  /**
   * Creates a new instance of `ValidationError`.
   *
   * @param message The message describing the reason why data validation failed.
   */
  constructor(message: string) {
    this.message = message
    this.type = 'validation'
    // Important: Setting the prototype ensures correct `instanceof` operator behavior.
    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}
