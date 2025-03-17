import { ListError, Phrases } from '@/lib/constants/text-const'
import { USER_EDIT_EMAIL_URL, USER_EDIT_NAME_URL } from '@/lib/constants/url'
import fetchUserData, {
  FetchUserData,
  UserNameAndEmail,
} from '@/lib/services/queries/user'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Skeleton } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense, use } from 'react'

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
          <UpdatingItem
            href={USER_EDIT_NAME_URL}
            label={Phrases.editUserName}
          >
            <SuspenseItem
              type='name'
              promise={userDataPromise}
            />
          </UpdatingItem>
          <UpdatingItem
            href={USER_EDIT_EMAIL_URL}
            label={Phrases.editEmail}
          >
            <SuspenseItem
              type='email'
              promise={userDataPromise}
            />
          </UpdatingItem>
        </List>
      </CardActions>
    </Card>
  )
}

function UpdatingItem({ href, label, children }: UpdatingItemProps) {
  return (
    <ListItem
      component={Link}
      href={href}
      sx={{ pr: 0 }}
    >
      <ListItemText
        primary={label}
        sx={{ color: 'primary.main' }}
      />
      <Suspense fallback={<ListItemText primary={<Skeleton />} />}>
        {children}
      </Suspense>
      <ListItemIcon sx={{ minWidth: '30px' }}>
        <ChevronRightIcon fontSize='small' />
      </ListItemIcon>
    </ListItem>
  )
}

function SuspenseItem({ type, promise }: SuspenseItemProps) {
  const { data, error } = use(promise)

  if (error && error.type !== 'database') notFound()
  if (error?.type === 'database') console.log('database error:', error?.message)
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

interface UpdatingItemProps {
  href: string
  label: string
  children: React.ReactElement<SuspenseItemProps>
}

interface SuspenseItemProps {
  type: keyof UserNameAndEmail
  promise: FetchUserData
}
