import { signout } from '@/lib/actions'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import { Box, Button } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import List from '@mui/material/List'
import ListItem, { ListItemProps } from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function UserDataEditing() {
  return (
    <Stack {...getStackProps()}>
      <MyCard>
        <ListItem {...getListItemProps(Link, '/user/edit-name')}>
          <ListItemText primary='Edit user name' />
          <MyListItemIcon>
            <ChevronRightIcon fontSize='small' />
          </MyListItemIcon>
        </ListItem>
        <ListItem {...getListItemProps(Link, '/user/edit-email')}>
          <ListItemText primary='Edit email' />
          <MyListItemIcon>
            <ChevronRightIcon fontSize='small' />
          </MyListItemIcon>
        </ListItem>
      </MyCard>
      <MyCard>
        <Box
          component='form'
          action={signout}
        >
          <ListItem {...getListItemProps(Link, '/user/edit-password')}>
            <ListItemText primary='Reset password' />
            <MyListItemIcon>
              <ChevronRightIcon fontSize='small' />
            </MyListItemIcon>
          </ListItem>
          <ListItem {...getListItemProps(Button, undefined, 'none', 'submit')}>
            <ListItemText
              primary='Sign out'
              slotProps={{
                primary: {
                  align: 'left',
                },
              }}
            />
            <MyListItemIcon>
              <LogoutIcon fontSize='small' />
            </MyListItemIcon>
          </ListItem>
        </Box>
      </MyCard>
      <MyCard>
        <ListItem {...getListItemProps(Link, '/user/delete')}>
          <ListItemText
            primary='Delete account'
            slotProps={{ primary: { color: 'warning' } }}
          />
          <MyListItemIcon>
            <PersonRemoveIcon
              fontSize='small'
              color='warning'
            />
          </MyListItemIcon>
        </ListItem>
      </MyCard>
    </Stack>
  )
}

function MyCard({ children }: MyElementsProps) {
  return (
    <Card
      component='nav'
      variant='outlined'
      sx={{ display: 'flex', width: { sm: '25%' } }}
    >
      <CardActions sx={{ width: '100%' }}>
        <List sx={{ width: '100%' }}>{children}</List>
      </CardActions>
    </Card>
  )
}

function MyListItemIcon({ children }: MyElementsProps) {
  return (
    <ListItemIcon
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {children}
    </ListItemIcon>
  )
}

const getStackProps = () => ({
  direction: { xs: 'column', sm: 'row' } as const,
  spacing: 5,
  sx: { display: 'flex', justifyContent: 'space-around', mt: '3vh' },
})

const getListItemProps = (
  component?: typeof Link | typeof Button,
  href?: string,
  textTransform?: 'none',
  type?: 'submit',
): ListItemProps => ({
  component,
  ...(href && { href }),
  ...(type && { type }),
  sx: {
    width: '100%',
    pr: 0,
    ...(textTransform && { textTransform }),
  },
})

interface MyElementsProps {
  children: ReactNode
}
