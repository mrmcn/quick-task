import { Theme } from '@mui/material'

const slotProps = {
  paper: { sx: { bgcolor: (theme: Theme) => theme.palette.primary.main } },
}

export const dialogStyles = { slotProps }
