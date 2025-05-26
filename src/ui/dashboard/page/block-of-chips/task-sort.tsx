'use client'

import {
  ListBtnNames,
  ListSortingParameter,
  ListSortingParameterValue,
  sortOptions,
} from '@/lib/constants/text-const'
import { useSortParams } from '@/lib/utils/hooks/use-sort-params'
import Chip from '@mui/material/Chip'
import { yellow } from '@mui/material/colors'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

export default function SortSelectorChip() {
  const { handleSortChange, selectValue } = useSortParams()
  const { titleAtoZ, titleZtoA, newestToOldest, oldestToNewest } = ListBtnNames
  const { titleAsc, titleDesc, dateAsc, dateDesc } = ListSortingParameter

  return (
    <FormControl
      variant='standard'
      sx={{ width: 150 }}
    >
      <Select
        labelId='sort-label'
        value={selectValue || titleAsc}
        onChange={handleSortChange}
        // input - custom Input component used instead of the standard field in Select.
        // renderValue - function that renders the display of the selected value. Here, we render a Chip with the appropriate label.
        input={
          <Input
            id='select-multiple-chip'
            disableUnderline
          />
        }
        renderValue={(selected) => (
          <Chip
            variant='outlined'
            label={getChipLabel(selected)}
            sx={{ width: 140 }}
          />
        )}
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
        <MenuItem value={titleAsc}>{titleAtoZ}</MenuItem>
        <MenuItem value={titleDesc}>{titleZtoA}</MenuItem>
        <MenuItem value={dateDesc}>{newestToOldest}</MenuItem>
        <MenuItem value={dateAsc}>{oldestToNewest}</MenuItem>
      </Select>
    </FormControl>
  )
}

// Factory function that returns a function to get the chip label based on the sorting value.

function getChipLabel(selectedValue: ListSortingParameterValue) {
  const selectedOption = sortOptions.find(
    (option) => option.value === selectedValue,
  )
  return selectedOption?.label || ListBtnNames.titleAtoZ
}
