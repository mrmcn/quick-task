'use client'

import { ListBtnNames, ListPhrases } from '@/lib/constants/text-const'
import { signout } from '@/lib/services/actions/user'
import useModal from '@/lib/utils/hooks/common/use-modal'
import ChevronIcon from '@/ui/user/page/setting-list/chevron-icon'
import LogoutIcon from '@mui/icons-material/Logout'
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
import sxListItemIconProps from '../../styles/sx-list-item-icon-props'
import { MyDialogProps } from '../dialogs-props/my-dialog-props'
import slotProps from '../dialogs-props/slot-props'
import Transition from '../dialogs-props/slot-transition'

export default function ListItemSignout() {
  const { open, openModal, closeModal } = useModal()

  return (
    <>
      <ListItem>
        <ListItemIcon sx={sxListItemIconProps()}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemButton
          onClick={openModal}
          sx={{ pl: 0 }}
        >
          <ListItemText
            primary={ListBtnNames.signout}
            slotProps={{ primary: { color: 'secondary' } }}
          />
        </ListItemButton>
        <ChevronIcon />
      </ListItem>
      <SignoutDialog
        open={open}
        closeModal={closeModal}
      />
    </>
  )
}

function SignoutDialog({ open, closeModal }: MyDialogProps) {
  const handleSignout = () => {
    closeModal()
    signout()
  }

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      slots={{ transition: Transition }}
      slotProps={slotProps()}
    >
      <DialogTitle>{ListPhrases.signoutTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{ListPhrases.signoutContent}</DialogContentText>
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
          onClick={handleSignout}
        >
          {ListBtnNames.signout}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
