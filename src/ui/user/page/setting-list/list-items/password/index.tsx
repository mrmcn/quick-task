'use client'

import {
  ListBtnNames,
  ListLabelName,
  ListPhrases,
} from '@/lib/constants/text-const'
import { updatePassword } from '@/lib/services/actions/user'
import useModal from '@/lib/utils/hooks/common/use-modal'
import FormWrapperUsesActionStateAndRendersErrors from '@/ui/common/forms/form-use-action-state'
import PasswordTextField from '@/ui/common/forms/text-fields/user/password'
import ChevronIcon from '@/ui/user/page/setting-list/chevron-icon'
import LockResetIcon from '@mui/icons-material/LockReset'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { MyDialogProps } from '../my-dialog-props'

export default function ListItemResetPassword() {
  const { open, openModal, closeModal } = useModal()

  return (
    <>
      <ListItem>
        <ListItemIcon sx={{ minWidth: '30px' }}>
          <LockResetIcon />
        </ListItemIcon>
        <ListItemButton
          onClick={openModal}
          sx={{ pl: 0 }}
        >
          <ListItemText
            primary={ListBtnNames.resetPassword}
            slotProps={{ primary: { color: 'secondary' } }}
          />
        </ListItemButton>
        <ChevronIcon />
      </ListItem>
      <ResetPasswordDialog
        open={open}
        closeModal={closeModal}
      />
    </>
  )
}

function ResetPasswordDialog({ open, closeModal }: MyDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={closeModal}
    >
      <DialogTitle>{ListPhrases.changePasswordTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {ListPhrases.changePasswordContent}
        </DialogContentText>
        <FormWrapperUsesActionStateAndRendersErrors
          action={updatePassword}
          renderWrappedComponent={(props) => (
            <FormContent
              closeModal={closeModal}
              disabled={props.isPending}
            />
          )}
        />
      </DialogContent>
    </Dialog>
  )
}

function FormContent({ closeModal, disabled }: ModalFormProps) {
  return (
    <>
      <PasswordTextField
        label={ListLabelName.currentPassword}
        name='currentPassword'
      />
      <PasswordTextField
        label={ListLabelName.newPassword}
        name='newPassword'
      />
      <PasswordTextField
        label={ListLabelName.confirmNewPassword}
        name='confirmNewPassword'
      />
      <DialogActions>
        <Button onClick={closeModal}>{ListBtnNames.cancel}</Button>
        <Button
          type='submit'
          disabled={disabled}
        >
          {ListBtnNames.save}
        </Button>
      </DialogActions>
    </>
  )
}

export interface InsideFormProps {
  closeModal: () => void
  isPending: boolean
  children: React.ReactNode
}

interface ModalFormProps {
  closeModal: () => void
  disabled: boolean
}
