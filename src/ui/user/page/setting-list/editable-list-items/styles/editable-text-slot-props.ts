import {
  ListItemTextOwnerState,
  SlotProps,
  TypographyProps,
} from '@mui/material'
import { ElementType, JSX } from 'react'

export default function editableTextSlotProps(): {
  primary: SlotProps<
    ElementType<TypographyProps, keyof JSX.IntrinsicElements>,
    object,
    ListItemTextOwnerState
  >
} {
  return {
    primary: { component: 'div' },
  }
}
