import { PAGES } from '@/lib/constants/routes'
import { BtnNamesList } from '@/lib/constants/text-const'
import ChevronIcon from '@/ui/user/page/setting-list/chevron-icon'
import { sxUser } from '@/ui/user/styles'
import LockResetIcon from '@mui/icons-material/LockReset'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'

/**
 * @function ListItemResetPassword
 * @description A component that renders a list item allowing the user
 * to navigate to the password reset page. It uses Material-UI components for structure
 * and Next.js Link for client-side navigation.
 *
 * @returns A list item with a password reset icon, text, and a chevron.
 */
export default function ListItemResetPassword() {
  return (
    <ListItem>
      <ListItemIcon sx={sxUser.listItemIcon}>
        <LockResetIcon />
      </ListItemIcon>
      <ListItemButton
        component={Link}
        href={PAGES.USER_RESET_PASSWORD}
        sx={sxUser.listItemButton}
      >
        <ListItemText
          primary={BtnNamesList.resetPassword}
          slotProps={sxUser.primaryColorSecondary}
        />
      </ListItemButton>
      <ChevronIcon />
    </ListItem>
  )
}
