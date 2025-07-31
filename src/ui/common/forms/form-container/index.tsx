import BackButton from '@/ui/common/forms/form-container/back-btn'
import MyButton from '@/ui/common/forms/form-container/my-button'
import RenderErrors from '@/ui/common/forms/render-errors'
import { sxForms } from '@/ui/common/forms/styles'
import { PageFormProps } from '@/ui/common/forms/types'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

/**
 * The **PageFormContainer** component serves as a universal wrapper for forms on pages,
 * such as authentication forms (login, signup) or other forms with a consistent style.
 * It provides a common structure including a "Back" button, form title,
 * an area for input fields, error display, and a form submission button.
 *
 * @param  btnName - The text displayed on the form's submit button (e.g., "Sign In", "Sign Up").
 * @param  formName - The title of the form.
 * @param  disabled - Determines if the form's submit button is disabled.
 * @param  state - The state object containing the results of the last form action. Used to pass to `RenderErrors` for displaying messages.
 * @param  children - The elements to be rendered inside the form container.
 *
 * @returns  The form container with all necessary elements.
 */
export default function PageFormContainer({
  btnName,
  formName,
  disabled,
  state,
  children,
}: PageFormProps) {
  return (
    <>
      {/* BackButton for navigation. It appears above the form container. */}
      <BackButton />
      <Container
        maxWidth='xs'
        sx={sxForms.container}
      >
        {/* Form title, whose text is determined by the `formName` prop */}
        <Typography
          component='h1'
          variant='h4'
          align='center'
          gutterBottom
        >
          {formName}
        </Typography>
        {/* Slot for embedding form input fields or other elements */}
        {children}
        {/* Component for displaying validation errors (Zod or general), based on the `state` */}
        <RenderErrors state={state} />
        {/* Form submission button, which displays `btnName` and can be disabled via `disabled` */}
        <MyButton
          btnName={btnName}
          disabled={disabled}
        />
      </Container>
    </>
  )
}
