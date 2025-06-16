import {
  ListBtnNamesValue,
  ListFormNamesValue,
} from '@/lib/constants/text-const'
import { StateProps } from '@/lib/services/actions/types'
import MyButton from '@/ui/common/forms/form-container/my-button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import BackButton from '../../back-btn'
import RenderErrors from '../render-errors'

export default function PageFormContainer({
  btnName,
  formName,
  disabled,
  state,
  children,
}: PageFormProps) {
  return (
    <>
      <BackButton />
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
        <RenderErrors state={state} />
        <MyButton
          btnName={btnName}
          disabled={disabled}
        />
      </Container>
    </>
  )
}

interface PageFormProps {
  children: React.ReactNode
  btnName: ListBtnNamesValue
  formName: ListFormNamesValue
  disabled: boolean
  state: StateProps
}
