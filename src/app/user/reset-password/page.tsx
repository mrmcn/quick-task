'use client'

import {
  BtnNamesList,
  FormNamesList,
  LabelsList,
  NameAttributeList,
  PhrasesList,
} from '@/lib/constants/text-const'
import { useResetPasswordLogic } from '@/lib/utils/hooks/use-reset-password-logic'
import PageFormContainer from '@/ui/common/forms/form-container'
import PasswordTextField from '@/ui/common/forms/text-fields/password'
import { DialogContainer } from '@/ui/user/page/setting-list/list-items/dialog-container'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

export default function ResetPasswordPage() {
  const { closeModal, formAction, isPending, open, router, state } =
    useResetPasswordLogic()

  return (
    <form action={formAction}>
      <PageFormContainer
        btnName={BtnNamesList.resetPassword}
        formName={FormNamesList.resetPassword}
        disabled={isPending}
        state={state}
      >
        <PasswordTextField
          label={LabelsList.currentPassword}
          name={NameAttributeList.currentPassword}
          id={NameAttributeList.currentPassword}
          fullWidth
          margin='dense'
        />
        <PasswordTextField
          label={LabelsList.newPassword}
          name={NameAttributeList.newPassword}
          id={NameAttributeList.newPassword}
          fullWidth
          margin='dense'
        />
        <PasswordTextField
          label={LabelsList.confirmNewPassword}
          name={NameAttributeList.confirmNewPassword}
          id={NameAttributeList.confirmNewPassword}
          fullWidth
          margin='dense'
        />
      </PageFormContainer>
      <DialogContainer
        open={open}
        closeModal={closeModal}
      >
        <DialogContent>
          <DialogContentText>{PhrasesList.passwordChanged}</DialogContentText>{' '}
        </DialogContent>
        <DialogActions>
          <Button
            color='secondary'
            onClick={router.back}
          >
            {BtnNamesList.ok}
          </Button>
        </DialogActions>
      </DialogContainer>
    </form>
  )
}
