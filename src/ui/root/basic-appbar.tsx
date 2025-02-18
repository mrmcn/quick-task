import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Suspense } from 'react'
import CabinetBtn from './cabinet-btn'
import SigninBtn from './signin-btn'

export default async function BasicAppBar() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography
          variant='h4'
          component='div'
          sx={{ flexGrow: 1 }}
        >
          QUICK TASK
        </Typography>
        <SigninBtn />
        <Suspense>
          <CabinetBtn />
        </Suspense>
      </Toolbar>
    </AppBar>
  )
}
