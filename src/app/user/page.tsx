import DeletingAccountCard from '@/ui/user/root/cards/delete'
import EditingNameAndEmailCard from '@/ui/user/root/cards/editing-name-email'
import ResetPasswordAndSignoutCard from '@/ui/user/root/cards/reset-password-signout'
import Stack from '@mui/material/Stack'

export default async function UserPage() {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={3}
      sx={{ display: 'flex', justifyContent: 'space-around', mt: '3vh' }}
    >
      <EditingNameAndEmailCard />
      <ResetPasswordAndSignoutCard />
      <DeletingAccountCard />
    </Stack>
  )
}
