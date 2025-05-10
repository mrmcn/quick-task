export function getOrderBy(sortParams: string) {
  const [field, order] = sortParams.split(' ')

  return {
    [field]: order,
  }
}
