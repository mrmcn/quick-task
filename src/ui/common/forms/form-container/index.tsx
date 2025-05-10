import MyButton from '@/ui/common/forms/form-container/my-button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { FormProps } from '../form-use-action-state'

export default function FormContainer({
  children,
  formName,
  isPending,
}: FormWrapperProps) {
  return (
    <Container
      maxWidth='xs'
      sx={{
        mt: { xs: '10vh', sm: '15vh' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography
        component='h1'
        variant='h4'
        align='center'
        gutterBottom
      >
        {formName}
      </Typography>
      {children}
      <MyButton
        formName={formName}
        disabled={isPending}
      />
    </Container>
  )
}

export interface FormWrapperProps extends FormProps {
  children?: React.ReactNode
  isPending?: boolean
}
