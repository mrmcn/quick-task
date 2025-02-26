import { signout } from '@/lib/actions'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Stack from '@mui/material/Stack'
import Link from 'next/link'

export default function UserDataEditing() {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={5}
      sx={{ display: 'flex', justifyContent: 'space-around', mt: '3vh' }}
    >
      <Card
        raised
        sx={{ display: 'flex', justifyContent: 'center', width: { sm: '25%' } }}
      >
        <CardActions>
          <MenuList>
            <MenuItem
              component={Link}
              href='/user/edit-name'
            >
              <ListItemIcon>
                <DoubleArrowIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary='Edit user name' />
            </MenuItem>
            <MenuItem
              component={Link}
              href='/user/edit-email'
            >
              <ListItemIcon>
                <DoubleArrowIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary='Edit email' />
            </MenuItem>
          </MenuList>
        </CardActions>
      </Card>
      <Card
        raised
        sx={{ display: 'flex', justifyContent: 'center', width: { sm: '25%' } }}
      >
        <CardActions>
          <MenuList
            component='form'
            action={signout}
          >
            <MenuItem
              component={Link}
              href='/user/edit-password'
            >
              <ListItemIcon>
                <DoubleArrowIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary='Reset password' />
            </MenuItem>
            <MenuItem
              component='button'
              type='submit'
            >
              <ListItemIcon>
                <LogoutIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary='Sign out' />
            </MenuItem>
          </MenuList>
        </CardActions>
      </Card>
      <Card
        raised
        sx={{ display: 'flex', justifyContent: 'center', width: { sm: '25%' } }}
      >
        <CardActions>
          <MenuList>
            <MenuItem
              component={Link}
              href='/user/delete'
            >
              <ListItemIcon>
                <PersonRemoveIcon
                  fontSize='small'
                  color='warning'
                />
              </ListItemIcon>
              <ListItemText
                primary='Delete account'
                slotProps={{ primary: { color: 'warning' } }}
              />
            </MenuItem>
          </MenuList>
        </CardActions>
      </Card>
    </Stack>
  )
}
