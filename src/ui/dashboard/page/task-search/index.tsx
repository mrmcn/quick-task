'use client'

import { useVisibility } from '@/lib/utils/hooks/use-search-field-visibility'
import { useSearchTask } from '@/lib/utils/hooks/use-search-task'
import { sxDashboardPage } from '@/ui/dashboard/page/styles'
import { SearchProps } from '@/ui/dashboard/page/types'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton } from '@mui/material'
import TextField from '@mui/material/TextField'

/**
 * @function Search
 * @description A client component for a search input field that dynamically changes its appearance
 * from an icon button to a text input field upon click. It handles search logic and interacts with the URL.
 *
 * @param placeholder - The placeholder text for the input field.
 * @returns An `IconButton` with a search icon or a `TextField` (input field).
 */
export default function Search({ placeholder }: SearchProps) {
  // Get the handleSearch function and the current query from the useSearchTask hook.
  // handleSearch - input handler for the text field with debouncing.
  // query - current search query value from the URL.
  const { handleSearch, query } = useSearchTask()

  // Get functions to manage input field visibility
  // and the current visibility state from the useVisibility hook.
  // handleOnBlur - blur event handler, hides the field if it's empty.
  // handleSearchIconClick - click handler for the search icon, makes the field visible.
  // isInputVisible - boolean value indicating whether the input field is visible.
  const { handleOnBlur, handleSearchIconClick, isInputVisible } =
    useVisibility()

  // If the input field is not visible, render only the search icon button.
  if (!isInputVisible)
    return (
      <IconButton
        onClick={handleSearchIconClick}
        sx={sxDashboardPage.iconBtn}
      >
        <SearchIcon />
      </IconButton>
    )

  // If the input field is visible, render the TextField component.
  return (
    <TextField
      variant='standard'
      placeholder={placeholder}
      defaultValue={query}
      onChange={handleSearch}
      sx={sxDashboardPage.textField}
      autoFocus
      onBlur={handleOnBlur}
    />
  )
}
