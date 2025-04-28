'use client'

import { ListBtnNames, ListPhrases } from '@/lib/constants/text-const'
import { signout } from '@/lib/services/actions/user'
import useDialog from '@/lib/utils/hooks/common/use-dialog'
import ChevronIcon from '@/ui/user/page/chevron-icon'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import { forwardRef } from 'react'

export default function ListItemWithSignout() {
  const { open, handleClickOpen, handleClose, handleDeleteAccount } =
    useDialog(signout)

  return (
    <>
      <ListItem onClick={handleClickOpen}>
        <ListItemIcon sx={{ minWidth: '30px' }}>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText
          primary={ListBtnNames.signout}
          slotProps={{ primary: { color: 'secondary' } }}
        />
        <ChevronIcon />
      </ListItem>
      <Dialog
        open={open}
        slots={{ transition: Transition }}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{ListPhrases.signout1}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {ListPhrases.signout2}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color='success'
            onClick={handleClose}
          >
            {ListBtnNames.cancel}
          </Button>
          <Button
            color='warning'
            onClick={handleDeleteAccount}
          >
            {ListBtnNames.signout}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return (
    <Slide
      direction='up'
      ref={ref}
      {...props}
    />
  )
})
