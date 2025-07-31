'use client'

import { sortOptionsConfig } from '@/lib/constants/data/ui-config'
import { BtnNamesList } from '@/lib/constants/text-const'
import { ListSortingParameterValue } from '@/lib/constants/type'
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
  // Use a custom hook to get the sort change handler function
  // and the current sorting parameter value from the URL.
  const { handleSortChange, value } = useSortParams()

  // Generate a list of MenuItem components based on the sorting options configuration.
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
        {listMenuItem} {/* Insert the generated menu items. */}
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
const selectedChip = (selected: ListSortingParameterValue) => {
  // Find the corresponding sorting option from the configuration.
  const selectedOption = sortOptionsConfig.find(
    (option) => option.value === selected,
  )
  // Determine the label: use the content of the found option or a default value.
  const label = selectedOption?.content || BtnNamesList.titleAtoZ

  return (
    <Chip
      variant='outlined'
      label={label} // Text label of the chip.
      sx={sxDashboardPage.selectedChip}
    />
  )
}
