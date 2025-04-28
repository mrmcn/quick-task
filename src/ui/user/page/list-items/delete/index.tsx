'use client'

import { ListBtnNames, ListPhrases } from '@/lib/constants/text-const'
import { deleteUser } from '@/lib/services/actions/user'
import useDialog from '@/lib/utils/hooks/common/use-dialog'
import ChevronIcon from '@/ui/user/page/chevron-icon'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import { deepOrange } from '@mui/material/colors'
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

export default function ListItemWithDeletingAccount() {
  const { open, handleClickOpen, handleClose, handleDeleteAccount } =
    useDialog(deleteUser)

  return (
    <>
      <ListItem onClick={handleClickOpen}>
        <ListItemIcon sx={{ minWidth: '30px' }}>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText
          primary={ListBtnNames.deleteAccount}
          sx={{ color: deepOrange[800] }}
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
        <DialogTitle>{ListPhrases.userDeleteText1}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {ListPhrases.userDeleteText2}
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
            {ListBtnNames.deleteAccount}
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
