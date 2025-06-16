export const PAGE_VALUE = [3, 4, 5, 7, 10] as const
export type PageValue = (typeof PAGE_VALUE)[number]
