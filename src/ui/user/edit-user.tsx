import { updateUserEmail, updateUserName } from '@/lib/actions'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { SignOut } from '../signout/form'
import EditForm from './edit-form'
import PasswordForm from './password-form'
import Box from '@mui/material/Box'

export default function EditUser() {
  return (
    <>
      <Box sx={{ mt: '3vh', mr: '2vw', textAlign: 'right' }}>
        <SignOut />
      </Box>
      <Typography
        component='h1'
        variant='h5'
        align='center'
        sx={{ mt: '5vh' }}
      >
        Change your name, email address or password.
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 3, sm: 6 }}
        sx={{
          mt: { xs: '10vh', sm: '20vh' },
          justifyContent: 'center',
        }}
      >
        <EditForm
          type='text'
          updateUser={updateUserName}
          name='name'
          placeholder='Enter your name'
        />
        <EditForm
          type='email'
          updateUser={updateUserEmail}
          name='email'
          placeholder='Enter your email address'
        />
        <PasswordForm />
      </Stack>
    </>
  )
}
