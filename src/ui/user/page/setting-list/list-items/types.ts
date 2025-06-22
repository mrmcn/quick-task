import { PageValue } from '@/lib/constants/data/pagination-config'

export interface MyDialogProps {
  open: boolean
  closeModal: () => void
}

export interface PageSelectProps {
  taskPerPage: PageValue
}
