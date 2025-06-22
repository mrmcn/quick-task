import { PageValue } from '@/lib/constants/data/ui-config'

export interface MyDialogProps {
  open: boolean
  closeModal: () => void
}

export interface PageSelectProps {
  taskPerPage: PageValue
}
