export function listItemSx(translateX: number) {
  return {
    pr: 0,
    display: 'flex',
    alignItems: 'stretch',
    transition: 'transform 0.2s ease-out',
    transform: `translateX(${translateX}px)`,
    backgroundColor: 'primary.light',
  }
}

export function getHiddenComponentProps(
  translateX: number,
  width: number | string,
  left?: number | string,
  right?: number | string,
) {
  const positionStyle =
    left !== undefined ? { left } : right !== undefined ? { right } : {}
  const transform =
    left !== undefined
      ? `translateX(calc(-${width}px + ${Math.max(0, translateX)}px))`
      : `translateX(calc(${width}px + ${Math.min(0, translateX)}px))`
  return { positionStyle, transform }
}
