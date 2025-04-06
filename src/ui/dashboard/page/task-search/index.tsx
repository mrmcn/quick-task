'use client'

import { ListLabelName } from '@/lib/constants/text-const'
import { useSearchTask } from '@/lib/utils/hooks/use-search-task'
import TextField from '@mui/material/TextField'

export default function Search({ placeholder }: Props) {
  const { handleSearch, query } = useSearchTask()

  return (
    <TextField
      variant='standard'
      label={ListLabelName.search}
      placeholder={placeholder}
      defaultValue={query}
      onChange={handleSearch}
      sx={{ bgcolor: 'primary.light' }}
    />
  )
}

interface Props {
  placeholder: string
}
