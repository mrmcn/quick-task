'use client'

import { ListBtnNames, ListPhrases } from '@/lib/constants/text-const'
import { signout } from '@/lib/services/actions/auth'
import useModal from '@/lib/utils/hooks/common/use-modal'
import ChevronIcon from '@/ui/user/page/setting-list/chevron-icon'
import SlideTransition from '@/ui/user/page/setting-list/list-items/slide-transition'
import slotProps from '@/ui/user/page/setting-list/list-items/styles'
import sxListItemIconProps from '@/ui/user/page/setting-list/styles'
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
      slots={{ transition: SlideTransition }}
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

interface MyDialogProps {
  open: boolean
  closeModal: () => void
}
