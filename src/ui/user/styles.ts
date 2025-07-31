import { Theme } from '@mui/material'
import { deepOrange, yellow } from '@mui/material/colors'

const listItemIcon = { minWidth: '30px' }

const chevron = { minWidth: '30px' }

const listItemText = { color: deepOrange[800] }

const listItemButton = { pl: 0 }

const dialogPaper = { bgcolor: (theme: Theme) => theme.palette.primary.main }

const primaryColorSecondary = { primary: { color: 'secondary' } }

const selectMenuListProps = {
  sx: {
    '& .MuiMenuItem-root': {
      backgroundColor: yellow[100],
    },
    padding: 0,
  },
}

export const sxUser = {
  chevron,
  listItemIcon,
  listItemText,
  listItemButton,
  dialogPaper,
  primaryColorSecondary,
  selectMenuListProps,
}
