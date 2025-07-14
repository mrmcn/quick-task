import { Priority, Status, User } from '@prisma/client'
import { ListSearchParameter } from '../constants/text-const'
import { ListSortingParameterValue } from '../constants/type'

/**
 * @interface CurrentAndNewPassword
 * @description Interface defining the structure of an object containing a user's current and new passwords.
 * Used to encapsulate related password data.
 * @property  currentPassword - The user's current password provided for verification.
 * @property  newPassword - The new password to be hashed after successful verification.
 */
export interface CurrentAndNewPassword {
  currentPassword: User['password']
  newPassword: User['password']
}

/**
 * @interface ParamValueMap
 * @description Interface for mapping `ListSearchParameter` to their corresponding value types.
 * This ensures type safety when working with URL parameters.
 */
export interface ParamValueMap {
  [ListSearchParameter.page]: string // Page is always a string
  [ListSearchParameter.priority]: Priority // Priority from Prisma enum
  [ListSearchParameter.query]: string // Search query string
  [ListSearchParameter.sorting]: ListSortingParameterValue // Sorting parameters
  [ListSearchParameter.status]: Status // Status from Prisma enum
}

/**
 * @description Type for a callback function to modify a `URLSearchParams` object.
 * This function receives the current search parameters object and can add,
 * change, or delete parameters before the URL is updated.
 */
export type UpdateParamsProps = (params: URLSearchParams) => void

/**
 * @property  currentPage - The current page number, validated and ready for use.
 * @property  countPages - The total number of pages, validated and guaranteed to be a number.
 */
type PaginationSuccessResult = {
  resolve: {
    currentPage: number
    countPages: number
  }
}

/**
 * @property  resolve - Indicates that an error occurred during pagination parameter preparation.
 */
type PaginationErrorResult = {
  resolve: 'error'
}

/**
 * @description A type representing the result of pagination parameter preparation.
 * It can be either an error object (`{ resolve: 'error' }`) or a success object
 * (`{ resolve: { currentPage, countPages } }`).
 */
export type PreparationPaginationParams =
  | PaginationErrorResult
  | PaginationSuccessResult

/**
 * @description A type representing the structure of a search parameters object.
 * Keys can be any string, and values are single strings.
 */
export type SearchParamsObject = {
  [key: string]: string
}
