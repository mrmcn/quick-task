const navSx = {
  '@media (min-width: 0px)': {
    bgcolor: 'primary.light',
    opacity: 0.8,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '90%',
    position: 'fixed',
    top: '70%',
    left: '5%',
    zIndex: 10,
  },
  '@media (min-width: 900px)': {
    display: 'block',
    width: 'auto',
    position: 'static',
    top: 'auto',
    left: 'auto',
  },
}

const fabSx = {
  '& > :not(style)': {
    position: 'fixed',
    top: '85%',
    left: '70%',
  },
}

export const dashboardStyles = { navSx, fabSx }
