import { PageValue } from '@/lib/constants/pagination-constants'

export interface MyDialogProps {
  open: boolean
  closeModal: () => void
}

export interface PageSelectProps {
  taskPerPage: PageValue
}
