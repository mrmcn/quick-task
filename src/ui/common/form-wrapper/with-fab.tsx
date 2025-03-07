import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container, { ContainerProps } from '@mui/material/Container'
import Fab, { FabProps } from '@mui/material/Fab'
import Typography from '@mui/material/Typography'
import { FormProps } from './with-action'

export default function FormWrapper({
  formName,
  formAction,
  children,
  ...props
}: FormWrapperWithFabProps) {
  const formHeader = formName === 'Sign in' ? 'Sign in' : 'Save'

  return (
    <Container {...getContainerProps(formAction)}>
      <Typography
        component='h1'
        variant='h4'
        align='center'
        gutterBottom
      >
        {formName}
      </Typography>
      {children}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: '10vh',
        }}
      >
        <Fab
          {...getFabProps()}
          component={Button}
          {...props}
        >
          {formHeader}
        </Fab>
      </Box>
    </Container>
  )
}

type FormWrapperWithFabProps = Omit<FormProps, 'action'> & {
  formAction?: (payload: FormData) => void
  disabled?: boolean
}

const getFabProps = (): FabProps => ({
  variant: 'extended',
  type: 'submit',
  color: 'primary',
  'aria-label': 'add',
  sx: {
    width: '100%',
    maxWidth: '300px',
  },
})

const getContainerProps = (
  formAction?: (payload: FormData) => void,
): Partial<ContainerProps> & React.FormHTMLAttributes<HTMLFormElement> => ({
  component: 'form',
  action: formAction,
  maxWidth: 'xs',
  sx: {
    mt: { xs: '10vh', sm: '15vh' },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
})
