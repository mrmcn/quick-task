import { FetchData } from '@/lib/services/queries/task'
import { fetchUserEmail, fetchUserName } from '@/lib/services/queries/user'
import EditableListItem from '@/ui/user/page/editable-list-items'
import EditableEmail from '@/ui/user/page/editable-list-items/editable-email'
import EditableUserName from '@/ui/user/page/editable-list-items/editable-name'
import EditablePassword from '@/ui/user/page/editable-list-items/editable-password'
import ListItemWithDeletingAccount from '@/ui/user/page/list-items/delete'
import ListItemWithSignout from '@/ui/user/page/list-items/signout'
import LockResetIcon from '@mui/icons-material/LockReset'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'

export default async function UserPage() {
  const userNamePromise = fetchUserName()
  const userEmailPromise = fetchUserEmail()

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <List sx={{ width: { xs: '100%', sm: '80%', md: '60%' } }}>
        <EditableListItem
          editableComponent={
            <EditableUserName userDataPromise={userNamePromise} />
          }
          firstIcon={<ModeEditIcon />}
        />
        <EditableListItem
          editableComponent={
            <EditableEmail userDataPromise={userEmailPromise} />
          }
          firstIcon={<ModeEditIcon />}
        />
        <EditableListItem
          editableComponent={<EditablePassword />}
          firstIcon={<LockResetIcon />}
        />
        <Divider variant='middle' />
        <ListItemWithSignout />
        <Divider variant='middle' />
        <ListItemWithDeletingAccount />
        <Divider variant='middle' />
      </List>
    </Box>
  )
}

export interface EditableUserDataProps {
  userDataPromise: FetchData<string>
}
