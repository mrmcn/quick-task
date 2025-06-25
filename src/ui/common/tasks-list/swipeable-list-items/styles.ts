import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'

export const listItemSx = (translateX: number) => {
  return {
    pr: 0,
    display: 'flex',
    alignItems: 'stretch',
    transition: 'transform 0.2s ease-out',
    transform: `translateX(${translateX}px)`,
    backgroundColor: 'primary.light',
  }
}

export const hiddenComponentSx = (
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
