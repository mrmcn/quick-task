'use client'

import { ListTextFieldLabel } from '@/lib/constants/text-const'
import { useUrlReplacement } from '@/lib/hooks'
import TextField from '@mui/material/TextField'

export default function Search({ placeholder }: { placeholder: string }) {
  const handleSearch = useUrlReplacement()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleSearch(e.target.value)

  return (
    <TextField
      label={ListTextFieldLabel.search}
      variant='standard'
      placeholder={placeholder}
      onChange={handleChange}
    />
  )
}
