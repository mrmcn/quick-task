'use client'

import { updateTasksPerPageNumber } from '@/lib/services/actions/user'
import Box from '@mui/material/Box'
import { yellow } from '@mui/material/colors'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

export default function PageSelect({ taskPerPage }: PageSelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    updateTasksPerPageNumber(event.target.value as string)
  }

  return (
    <Box>
      <FormControl>
        <Select
          labelId='task-per-page-select-label'
          id='task-per-page-select'
          value={taskPerPage}
          onChange={handleChange}
          input={
            <Input
              id='select-multiple-page'
              disableUnderline
            />
          }
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
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

interface PageSelectProps {
  taskPerPage: string
}
