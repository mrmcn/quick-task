import { ListBtnNames } from '@/lib/constants/text-const'
import { USER_RESET_PASSWORD_URL } from '@/lib/constants/url'
import ChevronIcon from '@/ui/user/page/setting-list/chevron-icon'
import LockResetIcon from '@mui/icons-material/LockReset'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import sxListItemIconProps from '../../styles/sx-list-item-icon-props'

export default function ListItemResetPassword() {
  return (
    <ListItem>
      <ListItemIcon sx={sxListItemIconProps()}>
        <LockResetIcon />
      </ListItemIcon>
      <ListItemButton
        component={Link}
        href={USER_RESET_PASSWORD_URL}
        sx={{ pl: 0 }}
      >
        <ListItemText
          primary={ListBtnNames.resetPassword}
          slotProps={{ primary: { color: 'secondary' } }}
        />
      </ListItemButton>
      <ChevronIcon />
    </ListItem>
  )
}
