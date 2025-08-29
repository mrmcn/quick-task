import { dashboardStyles } from '@/app/dashboard/styles'
import { PAGES } from '@/lib/constants/routes'
import { PlaceholderList } from '@/lib/constants/text-const'
import { SearchParamsObject } from '@/lib/utils/types'
import TasksList from '@/ui/common/tasks-list'
import ChipsBlock from '@/ui/dashboard/page/chips-block'
import Search from '@/ui/dashboard/page/task-search'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Link from 'next/link'
import { Suspense } from 'react'

/**
 * @typedef SearchParamsProps
 * @property [searchParams] - An optional promise that resolves to an object with search parameters from the URL.
 * This allows the component to receive parameters asynchronously and handle them with Suspense.
 */
export interface SearchParamsProps {
  searchParams?: Promise<SearchParamsObject>
}

/**
 * @function DashboardPage
 * @description An asynchronous Server Component representing the dashboard page.
 * It is responsible for rendering the main dashboard interface, including the tasks list,
 * search functionality, filter/sort block, and a button for creating new tasks.
 * The component uses React Suspense to manage the loading of dynamic parts.
 *
 * @param - Props containing search parameters from the URL.
 * @returns A JSX element representing the dashboard page.
 */
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
          <Search placeholder={PlaceholderList.search} />
        </Suspense>
        <ChipsBlock />
      </Box>
      <CreateTaskFab />
    </Box>
  )
}

/**
 * @function CreateTaskFab
 * @description A functional component that renders a Floating Action Button (FAB)
 * for creating a new task. When clicked, the FAB navigates the user to the task creation page.
 *
 * @returns A JSX element for the Floating Action Button.
 */
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
