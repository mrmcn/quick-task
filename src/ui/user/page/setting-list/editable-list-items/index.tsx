import ChevronIcon from '@/ui/user/page/setting-list/chevron-icon'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { JSX } from 'react'
import sxListItemIconProps from '../styles/sx-list-item-icon-props'

export default function EditableListItem({
  editableComponent,
  firstIcon,
}: EditableListItemProps) {
  return (
    <ListItem>
      <ListItemIcon sx={sxListItemIconProps()}>{firstIcon}</ListItemIcon>
      <ListItemText
        primary={editableComponent}
        slotProps={{
          primary: { component: 'div' },
        }}
      />
      <ChevronIcon />
    </ListItem>
  )
}

interface EditableListItemProps {
  editableComponent: JSX.Element
  firstIcon: JSX.Element
}
