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
  left?: number | string,
  right?: number | string,
) => {
  const transform =
    left !== undefined
      ? `translateX(calc(-${width}px + ${Math.max(0, translateX)}px))`
      : `translateX(calc(${width}px + ${Math.min(0, translateX)}px))`
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
    transform: transform,
  }
  if (left !== undefined) {
    styles.left = left
  } else if (right !== undefined) {
    styles.right = right
  }

  return styles
}
