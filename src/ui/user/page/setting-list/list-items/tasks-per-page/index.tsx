import { PhrasesList } from '@/lib/constants/text-const'
import { getTaskPerPage } from '@/lib/utils/helpers/get-task-per-page'
import PageSelect from '@/ui/user/page/setting-list/list-items/tasks-per-page/page-select'
import { sxUser } from '@/ui/user/styles'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

/**
 * @function ListItemTasksPerPage
 * @description A server component that displays a list item for configuring
 * the number of tasks displayed per page.
 * It asynchronously fetches the current `tasksPerPage` value for the user
 * and passes it to the client component `PageSelect`.
 *
 * @returns A list item with an icon, text, and a select component.
 */
export default async function ListItemTasksPerPage() {
  // Asynchronously fetch the current number of tasks per page for the user.
  const taskPerPage = await getTaskPerPage()

  return (
    <ListItem secondaryAction={<PageSelect taskPerPage={taskPerPage} />}>
      <ListItemIcon sx={sxUser.listItemIcon}>
        <FormatListNumberedIcon />
      </ListItemIcon>
      <ListItemText slotProps={sxUser.primaryColorSecondary}>
        {PhrasesList.tasksPerPage}
      </ListItemText>
    </ListItem>
  )
}
