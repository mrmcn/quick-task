import { Theme } from '@mui/material'

export default function slotProps() {
  return {
    paper: { sx: { bgcolor: (theme: Theme) => theme.palette.primary.main } },
  }
}
