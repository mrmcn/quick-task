import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import FormContainer from './container'
import MyButton from './my-button'

export default function FormSkeleton({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FormContainer>
      <Typography
        variant='h4'
        gutterBottom
      >
        <Skeleton />
      </Typography>
      {children}
      <MyButton />
    </FormContainer>
  )
}
