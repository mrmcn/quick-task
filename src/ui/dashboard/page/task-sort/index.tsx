'use client'

import { ListBtnNames, ListLabelName } from '@/lib/constants/text-const'
import { useSortParams } from '@/lib/hooks'
import { yellow } from '@mui/material/colors'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

export default function SortSelector() {
  const { handleSortChange, selectValue } = useSortParams()

  return (
    <FormControl variant='standard'>
      <InputLabel id='sort-label'>{ListLabelName.sortBy}</InputLabel>
      <Select
        labelId='sort-label'
        value={selectValue || 'title asc'}
        onChange={handleSortChange}
        MenuProps={{
          MenuListProps: {
            sx: {
              '& .MuiMenuItem-root': {
                backgroundColor: yellow[100],
              },
              padding: 0,
            },
          },
        }}
      >
        {/*
          Each MenuItem has a "value" attribute consisting of two parts separated by a space:
          1. The first part is the field name of the 'Task' PrismaORM model (e.g., 'title', 'date').
          2. The second part is the PrismaORM sorting argument (e.g., 'asc', 'desc').
          Other "value" options are possible that correspond to PrismaORM sorting queries.
        */}
        <MenuItem value='title asc'>{ListBtnNames.titleAtoZ}</MenuItem>
        <MenuItem value='title desc'>{ListBtnNames.titleZtoA}</MenuItem>
        <MenuItem value='date asc'>{ListBtnNames.newestToOldest}</MenuItem>
        <MenuItem value='date desc'>{ListBtnNames.oldestToNewest}</MenuItem>
      </Select>
    </FormControl>
  )
}
