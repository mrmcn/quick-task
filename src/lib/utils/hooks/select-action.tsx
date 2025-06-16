import { updateTasksPerPageNumber } from '@/lib/services/actions/user'
import { SelectChangeEvent } from '@mui/material/'
import FormHelperText from '@mui/material/FormHelperText'
import { useState } from 'react'
import { HandleError } from '../error-handling'

export default function useSelectAction() {
  const [error, setError] = useState<HandleError | null>(null)
  const errorText = error ? (
    <FormHelperText>{error.message}</FormHelperText>
  ) : null
  const handleChange = async (event: SelectChangeEvent) => {
    setError(null)
    const response = await updateTasksPerPageNumber(event.target.value)

    if (response?.status === 'error') setError(response.error)
  }

  return { errorText, handleChange }
}
