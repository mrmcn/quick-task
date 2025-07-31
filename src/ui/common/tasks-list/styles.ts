import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

const listItem = (translateX: number) => {
  return {
    pr: 0,
    display: 'flex',
    alignItems: 'stretch',
    transition: 'transform 0.2s ease-out',
    transform: `translateX(${translateX}px)`,
    backgroundColor: 'primary.light',
  }
}

const hiddenBox = (
  translateX: number,
  width: number | string,
  side: { left: 0 } | { right: 0 },
) => {
  const styles: SxProps<Theme> = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: width,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    transition: 'transform 0.2s ease-out',
  }
  if ('left' in side) {
    styles.transform = `translateX(calc(-${width}px + ${Math.max(
      0,
      translateX,
    )}px))`
    styles.left = side.left
  } else {
    styles.transform = `translateX(calc(${width}px + ${Math.min(
      0,
      translateX,
    )}px))`
    styles.right = side.right
  }

  return styles
}

const indexBox = {
  width: '100%',
}

const emptyBox = { mt: '5vh' }

const checkbox = { mr: 10 }

const priorityBoxForm = {
  width: 48,
  bgcolor: 'primary.light',
}

const priorityIconBtn = {
  color: 'secondary.main',
  justifyContent: 'center',
  height: '100%',
}

const priorityForm = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const priorityBoxIcon = { display: 'flex', alignItems: 'center' }
const arrowUpwardIcon = { fontSize: 'small' }
const priorityHighIcon = { marginLeft: '-8px' }
const statusCheckbox = { mr: 3 }
const statusProgress = { mr: 5, mt: 3, color: 'primary.dark' }
const statusForm = {
  display: 'flex',
  alignItems: 'stretch',
}

export const sxTasksList = {
  indexBox,
  emptyBox,
  listItem,
  hiddenBox,
  checkbox,
  priorityBoxForm,
  priorityIconBtn,
  priorityBoxIcon,
  priorityHighIcon,
  priorityForm,
  arrowUpwardIcon,
  statusCheckbox,
  statusProgress,
  statusForm,
}
