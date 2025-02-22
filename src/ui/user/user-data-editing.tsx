import { MenuItem, MenuList, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import Link from 'next/link'
import { SignOut } from '../signout/form'

export default function UserDataEditing() {
  return (
    <Box
      sx={{
        '& > :not(style)': {
          position: 'relative',
          top: '20vh',
          left: '30%',
          width: '45%',
        },
      }}
    >
      <Card
        raised
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <CardActions>
          <MenuList>
            <MenuItem
              component={Link}
              href='/user/edit'
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Typography
                align='center'
                variant='button'
              >
                Edit user data
              </Typography>
            </MenuItem>
            <MenuItem sx={{ display: 'flex', justifyContent: 'center' }}>
              <SignOut />
            </MenuItem>
            <MenuItem
              component={Link}
              href='/user/delete'
              color='error'
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Typography
                align='center'
                variant='button'
                color='warning'
              >
                Delete account
              </Typography>
            </MenuItem>
            <MenuItem
              component={Link}
              href='/dashboard'
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Typography
                align='center'
                variant='overline'
              >
                To the dashboard
              </Typography>
            </MenuItem>
          </MenuList>
        </CardActions>
      </Card>
    </Box>
  )
}
