'use client'

import { useSortParams } from '@/lib/hooks'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

export default function SortSelector() {
  const { handleSortChange, selectValue } = useSortParams()

  return (
    <FormControl variant='standard'>
      <InputLabel id='sort-label'>Sort by</InputLabel>
      <Select
        labelId='sort-label'
        value={selectValue || 'title asc'}
        onChange={handleSortChange}
      >
        {/*
          Each MenuItem has a "value" attribute consisting of two parts separated by a space:
          1. The first part is the field name of the 'Task' PrismaORM model (e.g., 'title', 'date').
          2. The second part is the PrismaORM sorting argument (e.g., 'asc', 'desc').
          Other "value" options are possible that correspond to PrismaORM sorting queries.
        */}
        <MenuItem value='title asc'>Title A to Z</MenuItem>
        <MenuItem value='title desc'>Title Z to A</MenuItem>
        <MenuItem value='date asc'>Newest to oldest</MenuItem>
        <MenuItem value='date desc'>Oldest to newest</MenuItem>
      </Select>
    </FormControl>
  )
}
