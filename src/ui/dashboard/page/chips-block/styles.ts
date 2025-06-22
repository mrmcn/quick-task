import { yellow } from '@mui/material/colors'

const stackSx = {
  mt: 1,
  alignItems: { xs: 'center', md: 'normal' },
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
  rowGap: 1.3,
}

const chipSx = {
  width: { md: 125 },
  '& .MuiChip-label': {
    textTransform: 'none', // This overrides the automatic text transformation (e.g., uppercase) that might be applied by the Button component's styles.
    fontWeight: 'normal', // This sets the font weight to normal, overriding any bolding that might be inherited from the Button component's styles.
  },
}

const selectMenuProps = {
  MenuListProps: {
    sx: {
      '& .MuiMenuItem-root': {
        backgroundColor: yellow[100],
      },
      padding: 0,
    },
  },
}

export const chipsBlock = {
  stackSx,
  chipSx,
  selectMenuProps,
}
