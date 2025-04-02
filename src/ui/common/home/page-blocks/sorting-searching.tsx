import { ListPlaceholder } from '@/lib/constants/text-const'
import Search from '@/ui/dashboard/page/task-search'
import SortSelector from '@/ui/dashboard/page/task-sort'
import Grid from '@mui/material/Grid2'
import { Suspense } from 'react'

export default function SortAndSearch() {
  return (
    <>
      <Grid size={6}>
        <Suspense>
          <Search placeholder={ListPlaceholder.search} />
        </Suspense>
      </Grid>
      <Grid
        size={6}
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <Suspense>
          <SortSelector />
        </Suspense>
      </Grid>
    </>
  )
}
