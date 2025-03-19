import { ListError, ListFormNames } from '@/lib/constants/text-const'
import { USER_EDIT_EMAIL_URL, USER_EDIT_NAME_URL } from '@/lib/constants/url'
import fetchUserData, { UserNameAndEmail } from '@/lib/services/queries/user'
import Await from '@/lib/utils/await'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Skeleton } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function EditingNameAndEmailCard() {
  const userDataPromise = fetchUserData()

  return (
    <Card
      component='nav'
      variant='outlined'
      sx={{ display: 'flex', width: { sm: '30%' } }}
    >
      <CardActions sx={{ width: '100%' }}>
        <List sx={{ width: '100%' }}>
          <ListItem
            component={Link}
            href={USER_EDIT_NAME_URL}
            sx={{ pr: 0 }}
          >
            <ListItemText
              primary={ListFormNames.editUserName}
              sx={{ color: 'primary.main' }}
            />
            <Suspense fallback={<ListItemText primary={<Skeleton />} />}>
              <Await promise={userDataPromise}>
                <ShowUserData type='name' />
              </Await>
            </Suspense>
            <ListItemIcon sx={{ minWidth: '30px' }}>
              <ChevronRightIcon fontSize='small' />
            </ListItemIcon>
          </ListItem>
          <ListItem
            component={Link}
            href={USER_EDIT_EMAIL_URL}
            sx={{ pr: 0 }}
          >
            <ListItemText
              primary={ListFormNames.editEmail}
              sx={{ color: 'primary.main' }}
            />
            <Suspense fallback={<ListItemText primary={<Skeleton />} />}>
              <Await promise={userDataPromise}>
                <ShowUserData type='email' />
              </Await>
            </Suspense>
            <ListItemIcon sx={{ minWidth: '30px' }}>
              <ChevronRightIcon fontSize='small' />
            </ListItemIcon>
          </ListItem>
        </List>
      </CardActions>
    </Card>
  )
}

function ShowUserData({ type, data }: ShowUserDataProps) {
  const userName = data?.[type] ?? ListError.dataError

  return (
    <ListItemText
      primary={userName}
      sx={{
        color: 'secondary.main',
        flexGrow: 0,
      }}
      slotProps={{
        primary: {
          variant: 'subtitle2',
        },
      }}
    />
  )
}

interface ShowUserDataProps {
  type: keyof UserNameAndEmail
  data?: UserNameAndEmail
}
