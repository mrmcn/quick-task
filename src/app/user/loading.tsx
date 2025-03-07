import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DeleteIcon from '@mui/icons-material/Delete'
import LockResetIcon from '@mui/icons-material/LockReset'
import LogoutIcon from '@mui/icons-material/Logout'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import List from '@mui/material/List'
import ListItem, { ListItemProps } from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import { ReactNode } from 'react'

export default async function UserDataEditing() {
  return (
    <Stack {...getStackProps()}>
      <MyCard>
        <ListItem {...getListItemProps()}>
          <ListItemText
            primary='Edit user name'
            sx={{ flexGrow: 1, color: 'primary.main' }}
          />
          <ListItemIconChevron />
        </ListItem>
        <ListItem {...getListItemProps()}>
          <ListItemText
            primary='Edit email'
            sx={{
              color: 'primary.main',
            }}
          />
          <ListItemIconChevron />
        </ListItem>
      </MyCard>
      <MyCard>
        <Box>
          <ListItem {...getListItemProps()}>
            <ListItemIcon sx={{ minWidth: '30px' }}>
              <LockResetIcon />
            </ListItemIcon>
            <ListItemText
              primary='Reset password'
              sx={{
                color: 'primary.main',
              }}
            />
            <ListItemIconChevron />
          </ListItem>
          <ListItem {...getListItemProps()}>
            <ListItemIcon sx={{ minWidth: '30px' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary='Sign out'
              sx={{
                color: 'primary.main',
              }}
              slotProps={{
                primary: {
                  align: 'left',
                },
              }}
            />
            <ListItemIconChevron />
          </ListItem>
        </Box>
      </MyCard>
      <MyCard>
        <ListItem {...getListItemProps()}>
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText
            primary='Delete account'
            sx={{
              color: 'primary.main',
            }}
            slotProps={{ primary: { color: 'warning' } }}
          />
          <ListItemIconChevron />
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
      sx={{ display: 'flex', width: { sm: '30%' } }}
    >
      <CardActions sx={{ width: '100%' }}>
        <List sx={{ width: '100%' }}>{children}</List>
      </CardActions>
    </Card>
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

const getListItemProps = (textTransform?: 'none'): ListItemProps => ({
  sx: {
    width: '100%',
    pr: 0,
    ...(textTransform && { textTransform }),
  },
})

interface MyElementsProps {
  children: ReactNode
}
