import { updateTasksPerPageNumber } from '@/lib/services/actions/user'
import { HandleError } from '@/lib/utils/error-handling/type'
import { SelectChangeEvent } from '@mui/material/'
import FormHelperText from '@mui/material/FormHelperText'
import { useState } from 'react'

/**
 * @function useSelectAction
 * @description A custom React hook designed to manage the selection action
 * for tasks per page within a Material-UI Select component.
 * This hook is responsible for updating the value on the server and handling potential errors,
 * displaying appropriate helper text.
 *
 * @returns  - An object containing:
 * - `errorText`: A React `FormHelperText` element with the error message if an error occurred,
 * or `null` if there are no errors.
 * - `handleChange`: An asynchronous event handler function for the `onChange` event of the Select component,
 * which updates the tasks per page number and processes the server response.
 */
export default function useSelectAction() {
  // State to hold the error object (if any) or `null`.
  const [error, setError] = useState<HandleError | null>(null)

  // A computed element that displays the error message
  // if the `error` object exists. Otherwise, it's `null`.
  const errorText = error ? (
    <FormHelperText>{error.message}</FormHelperText>
  ) : null

  /**
   * @function handleChange
   * @description An asynchronous event handler function for the `onChange` event of the Select component.
   * It **conditionally resets any current error (if one exists)**, calls a server action
   * to update the tasks per page number, and sets an error if the server response indicates one.
   *
   * @param  event - The change event object from the Select component.
   * `event.target.value` contains the new selected value.
   */
  const handleChange = async (event: SelectChangeEvent) => {
    // Reset the error only if it's currently set,
    // to avoid unnecessary re-renders.
    if (error !== null) setError(null)

    // Call the server action to update the tasks per page number,
    // passing the new selected value.
    const response = await updateTasksPerPageNumber(event.target.value)

    // Check the response from the server action. If the status is 'error',
    // set the received error into the state.
    if (response?.status === 'error') setError(response.error)
  }

  return { errorText, handleChange }
}
