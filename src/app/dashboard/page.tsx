import { ListPlaceholder } from '@/lib/constants/text-const'
import { DASHBOARD_CREATE_URL } from '@/lib/constants/url'
import { SearchParamsObject } from '@/lib/utils/get-search-params'
import TasksList from '@/ui/common/tasks-list'
import BlockOfChips from '@/ui/dashboard/page/block-of-chips'
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
        sx={{
          '@media (min-width: 0px)': {
            bgcolor: 'primary.light',
            opacity: 0.8,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '90%',
            position: 'fixed',
            top: '75%',
            left: '5%',
            zIndex: 10,
          },
          '@media (min-width: 900px)': {
            display: 'block',
            width: 'auto',
            position: 'static',
            top: 'auto',
            left: 'auto',
          },
        }}
      >
        <Suspense>
          <Search placeholder={ListPlaceholder.search} />
        </Suspense>
        <BlockOfChips />
      </Box>
      <CreateTaskFab />
    </Box>
  )
}

function CreateTaskFab() {
  return (
    <Box
      sx={{
        '& > :not(style)': {
          position: 'fixed',
          top: '85%',
          left: '70%',
        },
      }}
    >
      <Fab
        component={Link}
        href={DASHBOARD_CREATE_URL}
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
