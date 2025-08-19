import { PAGES } from '@/lib/constants/routes'
import { PhrasesList } from '@/lib/constants/text-const'
import { getAppBarConfig } from '@/lib/utils/helpers/get-appbar-config'
import { sxRootPage } from '@/ui/page/styles'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

/**
 * @function Appbar
 * @description A Server Component that renders the application's navigation bar (appbar).
 * It dynamically changes the user button's link and text based on whether the user is authenticated,
 * and fetches the user's name if logged in.
 *
 * @returns The appbar with buttons for navigation.
 */
export default async function Appbar() {
  // Asynchronously get the appbar configuration, which depends on the user's session state.
  const { secondBtnAriaLabel, secondBtnText, secondBtnUrl } =
    await getAppBarConfig()

  return (
    <Box
      component='nav'
      sx={sxRootPage.appbarBox}
    >
      {/* Button to navigate to the home page. */}
      <Button
        component={Link}
        href={PAGES.HOME}
        color='inherit'
        aria-label='Go to home'
      >
        <Typography>{PhrasesList.quickTask}</Typography>
      </Button>

      {/* Button to navigate to the user's cabinet or sign-in page. */}
      <Button
        component={Link}
        href={secondBtnUrl}
        color='inherit'
        aria-label={secondBtnAriaLabel}
      >
        <Typography>{secondBtnText}</Typography>
      </Button>
    </Box>
  )
}
