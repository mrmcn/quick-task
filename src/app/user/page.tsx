import { updateUserEmail, updateUserName } from '@/lib/services/actions/user'
import { fetchUser } from '@/lib/services/queries/user'
import EditableListItem from '@/ui/user/page/setting-list/editable-list-items'
import EditableUserData from '@/ui/user/page/setting-list/editable-list-items/editable-user-data'
import ListItemDeletingAccount from '@/ui/user/page/setting-list/list-items/delete'
import ListItemResetPassword from '@/ui/user/page/setting-list/list-items/password'
import ListItemSignout from '@/ui/user/page/setting-list/list-items/signout'
import TasksPerPage from '@/ui/user/page/setting-list/list-items/tasks-per-page'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'

export default async function UserPage() {
  const userNamePromise = fetchUser.uniqueData('name')
  const userEmailPromise = fetchUser.uniqueData('email')

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <List sx={{ width: { xs: '100%', sm: '80%', md: '60%' } }}>
        <EditableListItem
          editableComponent={
            <EditableUserData
              userDataPromise={userNamePromise}
              fieldName='name'
              action={updateUserName}
            />
          }
          firstIcon={<ModeEditIcon />}
        />
        <EditableListItem
          editableComponent={
            <EditableUserData
              userDataPromise={userEmailPromise}
              fieldName='email'
              action={updateUserEmail}
            />
          }
          firstIcon={<ModeEditIcon />}
        />
        <ListItemResetPassword />
        <TasksPerPage />
        <Divider variant='middle' />
        <ListItemSignout />
        <Divider variant='middle' />
        <ListItemDeletingAccount />
        <Divider variant='middle' />
      </List>
    </Box>
  )
}
