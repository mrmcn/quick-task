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
  const { handleSearch, query } = useSearchTask()
  const { handleOnBlur, handleSearchIconClick, isInputVisible } =
    useVisibility()

  if (!isInputVisible)
    return (
      <IconButton
        onClick={handleSearchIconClick}
        sx={sxDashboardPage.iconBtn}
      >
        <SearchIcon />
      </IconButton>
    )

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
