'use client'

import { BtnNamesList, PhrasesList } from '@/lib/constants/text-const'
import { deleteUser } from '@/lib/services/actions/user'
import { useConfirmDialog } from '@/lib/utils/hooks/common/use-confirm-dialog'
import ChevronIcon from '@/ui/user/page/setting-list/chevron-icon'
import { DialogContainer } from '@/ui/user/page/setting-list/list-items/dialog-container'
import { sxUser } from '@/ui/user/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

/**
 * @function ListItemDeletingAccount
 * @description A client component that represents a list item for deleting a user account.
 * Clicking it opens a confirmation dialog.
 * All dialog management logic and action execution are encapsulated within the `useConfirmDialog` hook.
 *
 * @returns A list item with a delete icon, text, and a modal confirmation dialog.
 */
export default function ListItemDeletingAccount() {
  // Use the custom useConfirmDialog hook, passing it the deleteUser server action.
  // This hook provides the modal's state (open), functions to open/close it (openModal, closeModal),
  // and a handler for the confirmation button (handleConfirm) that will execute deleteUser.
  const { closeModal, handleConfirm, open, openModal } =
    useConfirmDialog(deleteUser)

  return (
    <>
      <ListItem>
        <ListItemIcon sx={sxUser.listItemIcon}>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemButton
          onClick={openModal}
          sx={sxUser.listItemButton}
        >
          <ListItemText
            primary={BtnNamesList.deleteAccount}
            sx={sxUser.listItemText}
          />
        </ListItemButton>
        <ChevronIcon />
      </ListItem>
      <DialogContainer
        closeModal={closeModal}
        open={open}
      >
        <DialogTitle>{PhrasesList.userDeleteTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{PhrasesList.userDeleteContent}</DialogContentText>{' '}
        </DialogContent>
        <DialogActions>
          <Button
            color='success'
            onClick={closeModal}
          >
            {BtnNamesList.cancel}
          </Button>
          <Button
            color='warning'
            onClick={handleConfirm}
          >
            {BtnNamesList.deleteAccount}
          </Button>
        </DialogActions>
      </DialogContainer>
    </>
  )
}
