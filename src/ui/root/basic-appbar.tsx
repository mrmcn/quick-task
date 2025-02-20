import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Suspense } from 'react'
import CabinetBtn from './cabinet-btn'
import HomeBtn from './home-btn'
import SigninBtn from './signin-btn'

export default async function BasicAppBar() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <HomeBtn />
        <SigninBtn />
        <Suspense>
          <CabinetBtn />
        </Suspense>
      </Toolbar>
    </AppBar>
  )
}
