import { ListLoadingIndicator } from '@/lib/constants/text-const'
import { USER_EDIT_PASSWORD_URL } from '@/lib/constants/url'
import { signout } from '@/lib/services/actions/user'
import LoadingIndicator from '@/ui/common/loading-indicator'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import LockResetIcon from '@mui/icons-material/LockReset'
import LogoutIcon from '@mui/icons-material/Logout'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'

export default function ResetPasswordAndSignoutCard() {
  return (
    <Card
      component='nav'
      variant='outlined'
      sx={{
        display: 'flex',
        width: { sm: '30%' },
        bgcolor: 'primary.main',
      }}
    >
      <CardActions sx={{ width: '100%' }}>
        <List sx={{ width: '100%' }}>
          <ListItem
            component={Link}
            href={USER_EDIT_PASSWORD_URL}
            sx={{ pr: 0 }}
          >
            <ListItemIcon sx={{ minWidth: '30px' }}>
              <LockResetIcon />
            </ListItemIcon>
            <ListItemText primary='Reset password' />
            <ListItemIcon sx={{ minWidth: '30px' }}>
              <ChevronRightIcon fontSize='small' />
            </ListItemIcon>
          </ListItem>
          <form action={signout}>
            <ListItem
              component={Button}
              type='submit'
              sx={{
                width: '100%',
                pr: 0,
                textTransform: 'none',
              }}
            >
              <ListItemIcon sx={{ minWidth: '30px' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary='Sign out'
                sx={{ color: 'secondary.dark' }}
              />
              <ListItemIcon sx={{ minWidth: '30px' }}>
                <ChevronRightIcon fontSize='small' />
              </ListItemIcon>
            </ListItem>
            <LoadingIndicator content={ListLoadingIndicator.logoutIn} />
          </form>
        </List>
      </CardActions>
    </Card>
  )
}
