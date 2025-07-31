'use client'

import { PAGE_VALUE } from '@/lib/constants/data/ui-config'
import useSelectAction from '@/lib/utils/hooks/use-select-action'
import { sxUser } from '@/ui/user/styles'
import { PageSelectProps } from '@/ui/user/types'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

/**
 * @function PageSelect
 * @description A client component that renders a dropdown (Select)
 * for choosing the number of tasks per page.
 * It manages the selection state and handles user actions using `useSelectAction`.
 *
 * @param taskPerPage - The current number of tasks per page.
 * @returns A Material-UI Select component.
 */
export default function PageSelect({ taskPerPage }: PageSelectProps) {
  const { errorText, handleChange } = useSelectAction()

  const menu = PAGE_VALUE.map((value) => (
    <MenuItem
      key={value}
      value={value}
    >
      {value}
    </MenuItem>
  ))

  return (
    <Box>
      <FormControl>
        <Select
          labelId='task-per-page-select-label'
          id='task-per-page-select'
          value={String(taskPerPage)}
          onChange={handleChange}
          input={
            <Input
              id='select-multiple-page'
              disableUnderline
            />
          }
          MenuProps={{
            MenuListProps: sxUser.selectMenuListProps,
          }}
        >
          {menu}
        </Select>
        {errorText}
      </FormControl>
    </Box>
  )
}
