import ChevronIcon from '@/ui/user/page/setting-list/chevron-icon'
import { sxUser } from '@/ui/user/styles'
import { EditableListItemProps } from '@/ui/user/types'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

/**
 * @function EditableListItem
 * @description A component that renders a list item containing an editable component
 * (e.g., for displaying and changing user name or email) and a chevron icon as a visual indicator.
 *
 * @param editableComponent - The component to be displayed as the primary text
 * of the list item, which may be editable (e.g., `EditableUserData`).
 * @param firstIcon - The icon displayed at the start of the list item.
 * @returns A Material-UI ListItem with an icon, editable text, and a chevron.
 */
export default function EditableListItem({
  editableComponent,
  firstIcon,
}: EditableListItemProps) {
  return (
    <ListItem>
      <ListItemIcon sx={sxUser.listItemIcon}>{firstIcon}</ListItemIcon>
      <ListItemText
        primary={editableComponent} // Set our editable component as the primary content.
        slotProps={{
          primary: { component: 'div' },
        }}
      />
      <ChevronIcon />
    </ListItem>
  )
}
