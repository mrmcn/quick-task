import { ErrorList } from '@/lib/constants/text-const'
import { ActionResult } from '@/lib/services/types'
import Typography from '@mui/material/Typography'
import { nanoid } from 'nanoid'
import { ErrorMessageProps } from './types'

/**
 * The **RenderErrors** component is responsible for conditionally displaying error messages
 * for a form, based on the `ActionResult` state after a server action is performed.
 * It differentiates between various error types (Zod validation, general validation errors)
 * and renders them accordingly.
 *
 * @param  state - The state object containing the result of the last server action.
 * It is checked for an 'error' status to display messages.
 *
 * @returns A JSX element with error messages, or `null` if no errors are present.
 */
export default function RenderErrors({ state }: { state: ActionResult }) {
  if (state?.status === 'error') {
    if (state.error.type === 'zodValidation') {
      // Convert the errors object into an array of ValidationErrorMessage components
      const listErrors = Object.entries(state.error.details).map(
        ([key, value]) => (
          <ValidationErrorMessage
            key={nanoid()} // Generate a unique key for each list item
            nameField={key} // The name of the field where the error occurred
            value={value} // The array of error messages for this field
          />
        ),
      )
      return <>{listErrors}</>
    }
    if (state.error.type === 'validation') {
      return (
        <Typography
          align='center'
          color='error'
          aria-live='polite'
          aria-atomic='true' // Ensures the entire content is announced
        >
          {state.error.message} {/* The error message text */}
        </Typography>
      )
    }
  }
  // If no errors are present or the state is not an error, render nothing
  return null
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
      {ErrorList.errorInField}
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
