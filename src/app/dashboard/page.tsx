import { DASHBOARD_CREATE_URL } from '@/lib/constants/url'
import { SearchParamsObject } from '@/lib/utils/get-search-params'
import Home from '@/ui/common/home'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Link from 'next/link'

export default function DashboardPage({ searchParams }: SearchParamsProps) {
  return (
    <>
      <Home searchParams={searchParams} />
      <CreateTaskFab />
    </>
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
