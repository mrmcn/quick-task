import fetchUserData from '@/lib/data'
import * as userService from '@/lib/services/actions/user-service'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DeleteIcon from '@mui/icons-material/Delete'
import LockResetIcon from '@mui/icons-material/LockReset'
import LogoutIcon from '@mui/icons-material/Logout'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import List from '@mui/material/List'
import ListItem, { ListItemProps } from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText, { ListItemTextProps } from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import { User } from '@prisma/client'
import Link from 'next/link'
import { ReactNode } from 'react'

export default async function UserDataEditing() {
  const { email, userName } = await fetchUserData()

  return (
    <Stack {...getStackProps()}>
      <MyCard>
        <ListItem {...getListItemProps(Link, '/user/edit-name')}>
          <ListName
            getProps={getListNameProps('Edit user name', 'primary.main')}
          />
          <ListContent listContent={userName}></ListContent>
          <ListItemIconChevron />
        </ListItem>
        <ListItem {...getListItemProps(Link, '/user/edit-email')}>
          <ListName getProps={getListNameProps('Edit email', 'primary.main')} />
          <ListContent listContent={email}></ListContent>
          <ListItemIconChevron />
        </ListItem>
      </MyCard>
      <MyCard>
        <Box
          component='form'
          action={userService.signout}
        >
          <ListItem {...getListItemProps(Link, '/user/edit-password')}>
            <ListItemIcon sx={{ minWidth: '30px' }}>
              <LockResetIcon />
            </ListItemIcon>
            <ListName
              getProps={getListNameProps('Reset password', 'primary.main')}
            />
            <ListItemIconChevron />
          </ListItem>
          <ListItem {...getListItemProps(Button, undefined, 'none', 'submit')}>
            <ListItemIcon sx={{ minWidth: '30px' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListName getProps={getListNameProps('Sign out', 'primary.main')} />
            <ListItemIconChevron />
          </ListItem>
        </Box>
      </MyCard>
      <MyCard>
        <ListItem {...getListItemProps(Link, '/user/delete')}>
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <DeleteIcon />
          </ListItemIcon>
          <ListName
            getProps={getListNameProps('Delete account', 'warning.main')}
          />
          <ListItemIconChevron />
        </ListItem>
      </MyCard>
    </Stack>
  )
}

function MyCard({ children }: { children: ReactNode }) {
  return (
    <Card
      component='nav'
      variant='outlined'
      sx={{ display: 'flex', width: { sm: '30%' } }}
    >
      <CardActions sx={{ width: '100%' }}>
        <List sx={{ width: '100%' }}>{children}</List>
      </CardActions>
    </Card>
  )
}

function ListName({ getProps }: { getProps: ListItemTextProps }) {
  return <ListItemText {...getProps} />
}

function ListContent({ listContent }: ListContentProps) {
  return (
    <ListItemText
      primary={listContent}
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

function ListItemIconChevron() {
  return (
    <ListItemIcon sx={{ minWidth: '30px' }}>
      <ChevronRightIcon fontSize='small' />
    </ListItemIcon>
  )
}

const getStackProps = () => ({
  direction: { xs: 'column', sm: 'row' } as const,
  spacing: 3,
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

const getListNameProps = (
  primary: ListItemTextProps['primary'],
  color: string,
) => ({
  primary,
  sx: { color },
})

interface ListContentProps {
  listContent: User['name'] | User['email']
}
