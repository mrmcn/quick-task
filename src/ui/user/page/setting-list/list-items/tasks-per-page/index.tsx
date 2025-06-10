import { ListPhrases } from '@/lib/constants/text-const'
import { fetchUniqueUserData } from '@/lib/services/queries/user'
import sxListItemIconProps from '@/ui/user/page/setting-list/styles/sx-list-item-icon-props'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PageSelect from './page-select'

export default async function TasksPerPage() {
  const taskPerPage = await getTaskPerPage()

  return (
    <ListItem secondaryAction={<PageSelect taskPerPage={taskPerPage} />}>
      <ListItemIcon sx={sxListItemIconProps()}>
        <FormatListNumberedIcon />
      </ListItemIcon>
      <ListItemText slotProps={{ primary: { color: 'secondary' } }}>
        {ListPhrases.tasksPerPage}
      </ListItemText>
    </ListItem>
  )
}

async function getTaskPerPage() {
  const { data } = await fetchUniqueUserData('tasksPerPage')
  const taskPerPage = data || 3

  if (PAGE_VALUE.includes(taskPerPage as PageValue)) {
    return taskPerPage as PageValue
  } else {
    return 3
  }
}

export const PAGE_VALUE = [3, 4, 5, 7, 10] as const
export type PageValue = (typeof PAGE_VALUE)[number]
