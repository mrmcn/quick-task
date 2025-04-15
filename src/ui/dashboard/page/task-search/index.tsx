'use client'

import { useVisibility } from '@/lib/utils/hooks/use-search-field-visibility'
import { useSearchTask } from '@/lib/utils/hooks/use-search-task'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton } from '@mui/material'
import TextField from '@mui/material/TextField'

export default function Search({ placeholder }: Props) {
  const { handleSearch, query } = useSearchTask()
  const { handleOnBlur, handleSearchIconClick, isInputVisible } =
    useVisibility()

  if (!isInputVisible)
    return (
      <IconButton
        onClick={handleSearchIconClick}
        sx={{ color: 'action.active' }}
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
      sx={{ bgcolor: 'primary.light', mb: 1 }}
      autoFocus
      onBlur={handleOnBlur}
    />
  )
}

interface Props {
  placeholder: string
}
