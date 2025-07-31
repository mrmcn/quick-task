import { sxForms } from '@/ui/common/forms/styles'
import { MyButtonProps } from '@/ui/common/forms/types'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'

/**
 * The **MyButton** component is a versatile button designed for form submission.
 * It leverages Material-UI's `Fab` (Floating Action Button) in its extended variant,
 * integrating `Button` functionality to support form submission behavior.
 * The button can display a loading state and be disabled.
 *
 * @param  btnName - The text displayed on the button (e.g., "Sign In", "Save").
 * @param - An optional flag indicating whether the button should be disabled.
 * This is typically used to prevent multiple submissions while an action is in progress.
 *
 * @returns A versatile form submission button.
 */
export default function MyButton({ btnName, disabled }: MyButtonProps) {
  return (
    <Box sx={sxForms.myButtonBox}>
      <Fab
        component={Button} // Using Fab as a Button to support `type='submit'`
        variant='extended'
        type='submit'
        color='primary'
        aria-label='add'
        sx={sxForms.fab}
        loading={disabled} // Enables loading indicator if `disabled` is true
        loadingPosition='end'
        disabled={disabled} // Disables the button when `disabled` is true
      >
        {btnName}
      </Fab>
    </Box>
  )
}
