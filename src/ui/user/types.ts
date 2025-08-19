import { PageValue } from '@/lib/constants/type'
import { JSX } from 'react'

export interface MyDialogProps {
  open: boolean
  closeModal: () => void
  children?: React.ReactNode
}

export interface PageSelectProps {
  taskPerPage: PageValue
}

export interface EditableListItemProps {
  editableComponent: JSX.Element
  firstIcon: JSX.Element
}
