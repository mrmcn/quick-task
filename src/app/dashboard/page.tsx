import { dashboardStyles } from '@/app/dashboard/styles'
import { ListPlaceholder } from '@/lib/constants/text-const'
import { PAGES } from '@/lib/constants/url'
import { SearchParamsObject } from '@/lib/utils/get-search-params'
import TasksList from '@/ui/common/tasks-list'
import ChipsBlock from '@/ui/dashboard/page/chips-block'
import Search from '@/ui/dashboard/page/task-search'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function DashboardPage({
  searchParams,
}: SearchParamsProps) {
  const searchParamsObject = await searchParams

  return (
    <Box display='flex'>
      <TasksList searchParamsObject={searchParamsObject} />
      <Box
        component='nav'
        sx={dashboardStyles.navSx}
      >
        <Suspense>
          <Search placeholder={ListPlaceholder.search} />
        </Suspense>
        <ChipsBlock />
      </Box>
      <CreateTaskFab />
    </Box>
  )
}

function CreateTaskFab() {
  return (
    <Box sx={dashboardStyles.fabSx}>
      <Fab
        component={Link}
        href={PAGES.DASHBOARD_CREATE}
        color='primary'
        aria-label='create new task'
      >
        <AddIcon />
      </Fab>
    </Box>
  )
}

export interface SearchParamsProps {
  searchParams?: Promise<SearchParamsObject>
}
