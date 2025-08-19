import { SearchParameterList } from '@/lib/constants/text-const'
import {
  ListDefaultSearchParameterValue,
  ListSortingParameterValue,
} from '@/lib/constants/type'
import { ResponseObject } from '@/lib/services/types'
import { $Enums, User } from '@prisma/client'

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
 * Keys can be any string, and values are single strings or number.
 */
export type SearchParamsObject = {
  [key: string]: string | number
}

/**
 * @description Interface for search parameters used to filter and sort a list of items.
 */
export interface ParamValueMap {
  /**
   * The search query string to filter items by name or other relevant fields.
   */
  [SearchParameterList.query]: string
  /**
   * The current page number for pagination.
   */
  [SearchParameterList.page]: number
  /**
   * The field name by which to sort the results.
   * Can be 'createdAt', 'updatedAt', etc.
   */
  [SearchParameterList.sort]:
    | ListSortingParameterValue
    | Extract<ListDefaultSearchParameterValue, '{}'>
  /**
   * The status enum value to filter items.
   * Based on the available statuses in the system.
   */
  [SearchParameterList.status]: $Enums.Status | undefined
  /**
   * The priority enum value to filter or sort items.
   * Based on the defined priorities.
   */
  [SearchParameterList.priority]: $Enums.Priority | undefined
}

export type PartialParamValueMap = Partial<ParamValueMap>

export interface AuthData {
  userId: string
  userEmail: string | null | undefined
}

// Using a type alias to improve readability for complex mock data
export type MockResponse = Partial<ResponseObject<Partial<User>>>
