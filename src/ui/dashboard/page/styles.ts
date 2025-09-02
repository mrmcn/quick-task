import { yellow } from '@mui/material/colors'

const stack = {
  mt: 1,
  alignItems: { xs: 'center', md: 'normal' },
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
  rowGap: 1.3,
}

const chip = {
  width: { md: 125 },
  '& .MuiChip-label': {
    textTransform: 'none', // This overrides the automatic text transformation (e.g., uppercase) that might be applied by the Button component's styles.
    fontWeight: 'normal', // This sets the font weight to normal, overriding any bolding that might be inherited from the Button component's styles.
  },
}

const selectMenuProps = {
  '& .MuiMenuItem-root': {
    backgroundColor: yellow[100],
  },
  padding: 0,
}

const iconChip = { ml: 1 }

const chipFallback = { width: { md: 125 } }

const formControl = { width: 150 }

const selectedChip = { width: 140 }

const pagination = {
  display: 'flex',
  justifyContent: 'center',
  mt: 2,
}

const paginationRowBox = { display: 'flex', justifyContent: 'center' }

const iconBtn = { color: 'action.active' }

const textField = { bgcolor: 'primary.light', mb: 1 }

const alert = { width: '30%' }

export const sxDashboardPage = {
  stack,
  chip,
  selectMenuProps,
  iconChip,
  chipFallback,
  formControl,
  selectedChip,
  pagination,
  iconBtn,
  textField,
  paginationRowBox,
  alert,
}
