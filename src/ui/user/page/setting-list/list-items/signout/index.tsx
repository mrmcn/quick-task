'use client'

import { PAGES } from '@/lib/constants/routes'
import { BtnNamesList, PhrasesList } from '@/lib/constants/text-const'
import { signout } from '@/lib/services/actions/auth'
import { useConfirmDialog } from '@/lib/utils/hooks/common/use-confirm-dialog'
import ChevronIcon from '@/ui/user/page/setting-list/chevron-icon'
import { DialogContainer } from '@/ui/user/page/setting-list/list-items/dialog-container'
import { sxUser } from '@/ui/user/styles'
import LogoutIcon from '@mui/icons-material/Logout'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useCallback } from 'react'

/**
 * @function ListItemSignout
 * @description A client component that represents a list item for user signout.
 * Clicking it opens a confirmation dialog for signing out.
 * All dialog management logic and action execution are encapsulated within the `useConfirmDialog` hook.
 *
 * @returns A list item with a logout icon, text, and a modal confirmation dialog.
 */
export default function ListItemSignout() {
  // Memoize the action function using useCallback.
  // Dependencies: signout and PAGES.HOME. Since these are stable,
  // this function will also be stable and won't be re-created on every render.
  const signoutAction = useCallback(() => {
    signout(PAGES.HOME)
  }, [])
  const { closeModal, handleConfirm, open, openModal } =
    useConfirmDialog(signoutAction)

  return (
    <>
      <ListItem>
        <ListItemIcon sx={sxUser.listItemIcon}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemButton
          onClick={openModal}
          sx={sxUser.listItemButton}
        >
          <ListItemText
            primary={BtnNamesList.signout}
            slotProps={sxUser.primaryColorSecondary}
          />
        </ListItemButton>
        <ChevronIcon />
      </ListItem>
      <DialogContainer
        closeModal={closeModal}
        open={open}
      >
        <DialogTitle>{PhrasesList.signoutTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{PhrasesList.signoutContent}</DialogContentText>
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
            {BtnNamesList.signout}
          </Button>
        </DialogActions>
      </DialogContainer>
    </>
  )
}
