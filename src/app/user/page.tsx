import { sxUserPage } from '@/app/user/styles'
import { USER_DATA_SELECT } from '@/lib/db/selects'
import { updateUserEmail, updateUserName } from '@/lib/services/actions/user'
import { fetchUser } from '@/lib/services/queries/user/fetchUser'
import EditableListItem from '@/ui/user/page/setting-list/editable-list-items'
import EditableUserData from '@/ui/user/page/setting-list/editable-list-items/editable-user-data'
import ListItemDeletingAccount from '@/ui/user/page/setting-list/list-items/delete'
import ListItemResetPassword from '@/ui/user/page/setting-list/list-items/password'
import ListItemSignout from '@/ui/user/page/setting-list/list-items/signout'
import ListItemTasksPerPage from '@/ui/user/page/setting-list/list-items/tasks-per-page'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'

/**
 * @function UserPage
 * @description The user page component, displaying profile settings and account options.
 * This component is an asynchronous (Server Component), allowing it to fetch data directly.
 * It pre-fetches user data and passes it to child components.
 *
 * @returns A JSX element representing the user settings page.
 */
export default async function UserPage() {
  const userDataPromise = fetchUser.uniqueData(USER_DATA_SELECT)

  return (
    <Box sx={sxUserPage.topBox}>
      <List sx={sxUserPage.list}>
        {/* An editable list item for the user's name. */}
        <EditableListItem
          editableComponent={
            // The embedded component for editing user data.
            <EditableUserData
              userDataPromise={userDataPromise}
              fieldName='name'
              action={updateUserName}
            />
          }
          firstIcon={<ModeEditIcon />}
        />
        {/* An editable list item for the user's email. */}
        <EditableListItem
          editableComponent={
            // The embedded component for editing user data.
            <EditableUserData
              userDataPromise={userDataPromise}
              fieldName='email'
              action={updateUserEmail}
            />
          }
          firstIcon={<ModeEditIcon />}
        />
        <ListItemResetPassword />
        <ListItemTasksPerPage />
        <Divider variant='middle' />
        <ListItemSignout />
        <Divider variant='middle' />
        <ListItemDeletingAccount />
        <Divider variant='middle' />
      </List>
    </Box>
  )
}
