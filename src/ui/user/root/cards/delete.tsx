import { Phrases } from '@/lib/constants/text-const'
import { USER_DELETE_URL } from '@/lib/constants/url'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DeleteIcon from '@mui/icons-material/Delete'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'

export default async function DeletingAccountCard() {
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
            href={USER_DELETE_URL}
            sx={{ pr: 0 }}
          >
            <ListItemIcon sx={{ minWidth: '30px' }}>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText
              primary={Phrases.deleteAccount}
              sx={{ color: 'warning.main' }}
            />
            <ListItemIcon sx={{ minWidth: '30px' }}>
              <ChevronRightIcon fontSize='small' />
            </ListItemIcon>
          </ListItem>
        </List>
      </CardActions>
    </Card>
  )
}
