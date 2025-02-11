import { auth } from '@/auth'
import { deleteUser, updateUserEmail, updateUserName } from '@/lib/actions'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { redirect } from 'next/navigation'
import { SignOut } from '../signout/form'
import EditForm from './edit-form'
import PasswordForm from './password-form'

export default async function EditUser() {
  const session = await auth()
  if (!session) return redirect('/')

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
          mt: { xs: '5vh', sm: '10vh' },
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
      <Box
        sx={{
          mt: '20vw',
          mr: '2vw',
          textAlign: 'right',
        }}
      >
        <Button
          color='error'
          onClick={deleteUser.bind(null, session.user.id)}
        >
          Delete account
        </Button>
      </Box>
    </>
  )
}
