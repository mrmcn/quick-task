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
  // The page component for resetting or changing a user's password.

  // Invokes the custom hook `useResetPasswordLogic`, which encapsulates all the logic
  // related to form management, modal display, and navigation.
  const { closeModal, formAction, isPending, open, router, state } =
    useResetPasswordLogic()

  // The code for conditionally opening the modal has been moved inside `useResetPasswordLogic`.
  // This consolidates the logic for reacting to form state in one place,
  // making `ResetPasswordPage` even more focused on rendering the UI.

  return (
    <form action={formAction}>
      <PageFormContainer
        btnName={BtnNamesList.resetPassword} // The text displayed on the form's submit button.
        formName={FormNamesList.resetPassword} // The title of the form.
        disabled={isPending} // Disables the form's submit button if the request is in progress (`isPending`).
        state={state} // Passes the current state from `useActionState` for displaying messages or validation errors.
      >
        {/* Input field for the current password. */}
        <PasswordTextField
          label={LabelsList.currentPassword} // The label for the input field.
          name={NameAttributeList.currentPassword} // The `name` attribute for the HTML form.
          id={NameAttributeList.currentPassword} // The `id` attribute for linking with the label.
          fullWidth // Makes the field take up the full available width.
          margin='dense' // Applies a reduced vertical margin to the field.
        />
        {/* Input field for the new password. */}
        <PasswordTextField
          label={LabelsList.newPassword}
          name={NameAttributeList.newPassword}
          id={NameAttributeList.newPassword}
          fullWidth
          margin='dense'
        />
        {/* Input field for confirming the new password. */}
        <PasswordTextField
          label={LabelsList.confirmNewPassword}
          name={NameAttributeList.confirmNewPassword}
          id={NameAttributeList.confirmNewPassword}
          fullWidth
          margin='dense'
        />
      </PageFormContainer>
      {/* Container for the modal dialog window that appears after an action. */}
      <DialogContainer
        open={open} // Controls the visibility state of the modal, whose state is managed from `useResetPasswordLogic`.
        closeModal={closeModal} // Function to close the modal window.
      >
        <DialogContent>
          <DialogContentText>{PhrasesList.passwordChanged}</DialogContentText>{' '}
        </DialogContent>
        <DialogActions>
          <Button
            color='secondary'
            onClick={router.back} // On click, navigates the user back to the previous page in the browser history.
          >
            {BtnNamesList.ok}
          </Button>
        </DialogActions>
      </DialogContainer>
    </form>
  )
}
