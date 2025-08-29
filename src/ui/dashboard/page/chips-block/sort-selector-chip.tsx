'use client'

import { sortOptionsConfig } from '@/lib/constants/data/ui-config'
import { BtnNamesList } from '@/lib/constants/text-const'
import { useSortParams } from '@/lib/utils/hooks/use-sort-params'
import { sxDashboardPage } from '@/ui/dashboard/page/styles'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

/**
 * @function SortSelectorChip
 * @description A client component that provides task sorting functionality
 * via a Material-UI `Select` component. It interacts with the URL to update the sorting parameter.
 *
 * @returns A FormControl wrapper containing the Select component with sorting options.
 */
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
      sx={sxDashboardPage.formControl}
    >
      <Select
        labelId='sort-label'
        value={value} // The current selected value, retrieved from the URL.
        onChange={handleSortChange}
        // `input` - A custom Input component used instead of the standard field in Select.
        // Ensures the desired visual appearance, e.g., no underline.
        input={
          <Input
            id='select-multiple-chip'
            disableUnderline // Removes the standard underline.
          />
        }
        // `renderValue` - A function that defines how the selected value is displayed.
        // Here, we render a Chip with the appropriate label.
        renderValue={selectedChip}
        MenuProps={{
          MenuListProps: {
            sx: sxDashboardPage.selectMenuProps,
          },
        }} // Custom styles for the menu items.
      >
        {listMenuItem}
      </Select>
    </FormControl>
  )
}

/**
 * @function selectedChip
 * @description A helper function that renders the selected sorting value as a `Chip`.
 * This enhances the visual representation of the current filter within the `Select` component.
 *
 * @param selected - The current selected value of the sorting parameter.
 * @returns A Material-UI Chip component with a label displaying the selected parameter.
 */
const selectedChip = (selected: string) => {
  const selectedOption = sortOptionsConfig.find(
    (option) => option.value === selected,
  )
  const label = selectedOption?.content || BtnNamesList.titleAtoZ

  return (
    <Chip
      variant='outlined'
      label={label}
      sx={sxDashboardPage.selectedChip}
    />
  )
}
