import { Theme } from '@mui/material'
import { yellow } from '@mui/material/colors'

const slotProps = {
  paper: { sx: { bgcolor: (theme: Theme) => theme.palette.primary.main } },
}

export const dialogStyles = { slotProps }

export const sxSelectMenuListProps = {
  sx: {
    '& .MuiMenuItem-root': {
      backgroundColor: yellow[100],
    },
    padding: 0,
  },
}
