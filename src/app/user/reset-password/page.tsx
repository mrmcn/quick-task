'use client'

import {
  ListBtnNames,
  ListFormNames,
  ListLabels,
  ListPhrases,
  TextFieldsNameAttributeList,
} from '@/lib/constants/text-const'
import { StateProps } from '@/lib/services/actions/types'
import { updateUserPassword } from '@/lib/services/actions/user'
import useModal from '@/lib/utils/hooks/common/use-modal'
import PageFormContainer from '@/ui/common/forms/form-container'
import PasswordTextField from '@/ui/common/forms/text-fields/password'
import slotProps from '@/ui/user/page/setting-list/list-items/styles'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { useRouter } from 'next/navigation'
import { useActionState } from 'react'

export default function ResetPasswordPage() {
  const [state, formAction, isPending] = useActionState(
    updateUserPassword,
    undefined,
  )

  return (
    <form action={formAction}>
      <PageFormContainer
        btnName={ListBtnNames.resetPassword}
        formName={ListFormNames.resetPassword}
        disabled={isPending}
        state={state}
      >
        <PasswordTextField
          label={ListLabels.currentPassword}
          name={TextFieldsNameAttributeList.currentPassword}
          id={TextFieldsNameAttributeList.currentPassword}
          fullWidth
          margin='dense'
        />
        <PasswordTextField
          label={ListLabels.newPassword}
          name={TextFieldsNameAttributeList.newPassword}
          id={TextFieldsNameAttributeList.newPassword}
          fullWidth
          margin='dense'
        />
        <PasswordTextField
          label={ListLabels.confirmNewPassword}
          name={TextFieldsNameAttributeList.confirmNewPassword}
          id={TextFieldsNameAttributeList.confirmNewPassword}
          fullWidth
          margin='dense'
        />
      </PageFormContainer>
      <FormDialog state={state} />
    </form>
  )
}

function FormDialog({ state }: FormDialogProps) {
  const { open, openModal, closeModal } = useModal()
  const router = useRouter()

  if (state?.status === 'success' && open === false) openModal()

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      slotProps={slotProps()}
    >
      <DialogContent>
        <DialogContentText>{ListPhrases.passwordChanged}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color='secondary'
          onClick={router.back}
        >
          {ListBtnNames.ok}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

type FormDialogProps = { state: StateProps }
