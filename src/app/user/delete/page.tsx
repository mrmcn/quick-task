import * as userService from '@/lib/services/actions/user-service'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default function DeletingUser() {
  return (
    <Box
      sx={{
        width: '100%',
        mt: '20vh',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Card raised>
        <CardContent>
          <Typography
            align='center'
            color='warning'
            gutterBottom
            sx={{ fontSize: 14 }}
          >
            Are you sure? This action cannot be undone. All user data will be
            lost forever.
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            component={Link}
            href='/user'
            size='large'
          >
            Cancel
          </Button>
          <Button
            color='error'
            size='small'
            onClick={userService.deleteUser}
          >
            Delete account
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}
