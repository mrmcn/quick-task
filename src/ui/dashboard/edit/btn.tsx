import { ListBtnNames } from '@/lib/constants/text-const'
import Button from '@mui/material/Button'

export function Btn({ disabled }: BtnProps) {
  return (
    <Button
      type='submit'
      color='error'
      disabled={disabled}
    >
      {ListBtnNames.deleteTask}
    </Button>
  )
}

interface BtnProps {
  disabled: boolean
}
