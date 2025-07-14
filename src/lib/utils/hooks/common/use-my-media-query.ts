import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

/**
 * @function useMyMediaQuery
 * @description A custom React hook that provides a convenient way to determine the current
 * screen size (mobile, tablet, desktop) based on Material-UI's theme breakpoints.
 * It encapsulates the `useMediaQuery` logic for common device sizes.
 *
 * @returns - An object containing:
 * - `isMobile`: `true` if the screen width is less than or equal to the 'sm' (small) breakpoint.
 * - `isTablet`: `true` if the screen width is between the 'sm' and 'md' (medium) breakpoints.
 * - `isDesktop`: `true` if the screen width is greater than or equal to the 'md' (large) breakpoint.
 */
export function useMyMediaQuery() {
  // Get the Material-UI theme object, which contains breakpoints.
  const theme = useTheme()

  // Use `useMediaQuery` to check if the screen width is less than or equal to the 'sm' breakpoint.
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  // Use `useMediaQuery` to check if the screen width is between the 'sm' and 'md' breakpoints.
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  // Use `useMediaQuery` to check if the screen width is greater than or equal to the 'md' breakpoint.
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  // Return an object with boolean flags for each screen size.
  return { isDesktop, isMobile, isTablet }
}
