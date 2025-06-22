'use client'

import { sortOptionsConfig } from '@/lib/constants/data/ui-config'
import { ListBtnNames } from '@/lib/constants/text-const'
import { ListSortingParameterValue } from '@/lib/constants/type'
import { useSortParams } from '@/lib/utils/hooks/use-sort-params'
import { chipsBlock } from '@/ui/dashboard/page/chips-block/styles'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

export default function SortSelectorChip() {
  const { handleSortChange, value } = useSortParams()
  const listMenuItem = sortOptionsConfig.map((option) => (
    <MenuItem
      key={option.value}
      value={option.value}
    >
      {option.content}
    </MenuItem>
  ))

  return (
    <FormControl
      variant='standard'
      sx={{ width: 150 }}
    >
      <Select
        labelId='sort-label'
        value={value}
        onChange={handleSortChange}
        // input - custom Input component used instead of the standard field in Select.
        // renderValue - function that renders the display of the selected value. Here, we render a Chip with the appropriate label.
        input={
          <Input
            id='select-multiple-chip'
            disableUnderline
          />
        }
        renderValue={selectedChip}
        MenuProps={chipsBlock.selectMenuProps}
      >
        {listMenuItem}
      </Select>
    </FormControl>
  )
}

const selectedChip = (selected: ListSortingParameterValue) => {
  const selectedOption = sortOptionsConfig.find(
    (option) => option.value === selected,
  )
  const label = selectedOption?.content || ListBtnNames.titleAtoZ

  return (
    <Chip
      variant='outlined'
      label={label}
      sx={{ width: 140 }}
    />
  )
}
