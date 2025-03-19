import { ListButtonNames, ListPhrases } from '@/lib/constants/text-const'
import { deleteUser } from '@/lib/services/actions/user'
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
            {ListPhrases.userDeleteText}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            component={Link}
            href='/user'
            size='large'
          >
            {ListButtonNames.cancel}
          </Button>
          <Button
            color='error'
            size='small'
            onClick={deleteUser}
          >
            {ListButtonNames.deleteAccount}
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}
