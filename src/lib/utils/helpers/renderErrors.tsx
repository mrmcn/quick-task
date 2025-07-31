import { ErrorList } from '@/lib/constants/text-const'
import { HandleErrorProps, ZodErrors } from '@/lib/utils/error-handling/type'
import { ErrorMessageProps } from '@/ui/common/forms/types'
import Typography from '@mui/material/Typography'
import { nanoid } from 'nanoid'

/**
 * Helper function for rendering errors received from Zod validation.
 * Each Zod error corresponds to a specific form field and may contain multiple messages.
 *
 * @param details - An object containing details of Zod validation errors,
 * where keys are field names and values are arrays of message strings.
 *
 * @returns A JSX fragment containing a list of field error messages.
 */
export function renderZodErrors(details: ZodErrors) {
  // Convert the errors object into an array of ValidationErrorMessage components
  const listErrors = Object.entries(details).map(([key, value]) => (
    <ValidationErrorMessage
      key={nanoid()} // Generate a unique key for each list item
      nameField={key} // The name of the field where the error occurred
      value={value} // The array of error messages for this field
    />
  ))
  return <>{listErrors}</>
}

/**
 * Helper function for rendering general validation errors.
 * Used when an error is not tied to a specific field or is a general error message.
 *
 * @param message - The general error message.
 *
 * @returns A Typography JSX element with the error message.
 */
export function renderValidationErrors(message: HandleErrorProps['message']) {
  return (
    <Typography
      align='center'
      color='error'
      aria-live='polite'
      aria-atomic='true' // Ensures the entire content is announced
    >
      {message} {/* The error message text */}
    </Typography>
  )
}

/**
 * Helper component for displaying an error message for a specific form field.
 * Displays the field name and a list of error messages for it.
 *
 * @param nameField - The name of the field where the error occurred.
 * @param value - An array of strings with error messages for this field.
 *
 * @returns A Typography JSX element with detailed field error information.
 */
function ValidationErrorMessage({ nameField, value }: ErrorMessageProps) {
  return (
    <Typography
      align='center'
      color='error'
      aria-live='polite'
      aria-atomic='true'
    >
      {ErrorList.errorInField} {/* Static text "Error in field" */}
      {/* Using `Typography component='span'` here is crucial.
        It allows nesting an inline element (<span>) inside a paragraph (<p>)
        for styling or highlighting part of the text without violating HTML semantics.
        Directly nesting block-level elements, such as `<p>` within another `<p>`, is invalid HTML
        and can lead to unpredictable browser behavior and DOM structure issues.
      */}
      <Typography
        component='span' // Renders as an HTML span, embedded within the paragraph text
        variant='subtitle1'
      >
        {` "${nameField}" `}: {/* Displaying the field name in quotes */}
      </Typography>
      {value.join(', ')} {/* Joining the array of error messages with commas */}
    </Typography>
  )
}
