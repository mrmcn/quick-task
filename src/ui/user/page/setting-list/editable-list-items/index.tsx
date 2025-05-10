import ChevronIcon from '@/ui/user/page/setting-list/chevron-icon'
import editableTextSlotProps from '@/ui/user/page/setting-list/editable-list-items/styles/editable-text-slot-props'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { JSX } from 'react'

export default function EditableListItem({
  editableComponent,
  firstIcon,
}: EditableListItemProps) {
  return (
    <ListItem>
      <ListItemIcon sx={{ minWidth: '30px' }}>{firstIcon}</ListItemIcon>
      <ListItemText
        primary={editableComponent}
        slotProps={editableTextSlotProps()}
      />
      <ChevronIcon />
    </ListItem>
  )
}

interface EditableListItemProps {
  editableComponent: JSX.Element
  firstIcon: JSX.Element
}
