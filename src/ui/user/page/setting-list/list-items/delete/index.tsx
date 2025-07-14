'use client'

import { ListBtnNames, ListPhrases } from '@/lib/constants/text-const'
import { deleteUser } from '@/lib/services/actions/user'
import useModal from '@/lib/utils/hooks/common/use-modal'
import ChevronIcon from '@/ui/user/page/setting-list/chevron-icon'
import SlideTransition from '@/ui/user/page/setting-list/list-items/slide-transition'
import { dialogStyles } from '@/ui/user/page/setting-list/list-items/styles'
import { MyDialogProps } from '@/ui/user/page/setting-list/list-items/types'
import sxListItemIconProps from '@/ui/user/page/setting-list/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import { deepOrange } from '@mui/material/colors'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

export default function ListItemDeletingAccount() {
  const { open, openModal, closeModal } = useModal()

  return (
    <>
      <ListItem>
        <ListItemIcon sx={sxListItemIconProps()}>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemButton
          onClick={openModal}
          sx={{ pl: 0 }}
        >
          <ListItemText
            primary={ListBtnNames.deleteAccount}
            sx={{ color: deepOrange[800] }}
          />
        </ListItemButton>
        <ChevronIcon />
      </ListItem>
      <DelAccDialog
        open={open}
        closeModal={closeModal}
      />
    </>
  )
}

function DelAccDialog({ open, closeModal }: MyDialogProps) {
  const handleDeleteAccount = () => {
    closeModal()
    deleteUser()
  }

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      slots={{ transition: SlideTransition }}
      slotProps={dialogStyles.slotProps}
    >
      <DialogTitle>{ListPhrases.userDeleteTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{ListPhrases.userDeleteContent}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color='success'
          onClick={closeModal}
        >
          {ListBtnNames.cancel}
        </Button>
        <Button
          color='warning'
          onClick={handleDeleteAccount}
        >
          {ListBtnNames.deleteAccount}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
