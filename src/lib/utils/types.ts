import { SearchParameterList } from '@/lib/constants/text-const'
import {
  ListDefaultSearchParameterValue,
  ListSortingParameterValue,
} from '@/lib/constants/type'
import { ResponseObject } from '@/lib/services/types'
import { $Enums, User } from '@prisma/client'
import { Session } from 'next-auth'

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
export type PaginationSuccessResult = {
  resolve: {
    currentPage: number
    countPages: number
  }
}

/**
 * @property  resolve - Indicates that an error occurred during pagination parameter preparation.
 */
export type PaginationErrorResult = {
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
  [key: string]: string
}

export interface RawSearchParams {
  [SearchParameterList.query]: string | undefined
  [SearchParameterList.page]: string | undefined
  [SearchParameterList.sort]: string | undefined
  [SearchParameterList.status]: string | undefined
  [SearchParameterList.priority]: string | undefined
}

/**
 * @description Interface for search parameters used to filter and sort a list of items.
 */
export interface ValidateParamValueMap {
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

/**
 * Represents the possible value of a URL search parameter retrieved via `URLSearchParams.get()`.
 * This type ensures a single source of truth for all query parameter values, which are inherently `string`
 * if present in the URL or `null` if absent.
 *
 * This **centralized typing** is crucial for preventing common errors, such as:
 * - Incorrectly assuming a value is a `number` (e.g., for `page`), which would lead to runtime errors when performing mathematical operations.
 * - Missing a `null` check during server-side rendering or before hydration, which would cause unexpected behavior.
 *
 * By explicitly typing the value as `string | null`, we enforce rigorous checks
 * and ensure that functions using `valueCurrentQueryParameter` correctly handle both
 * the presence and absence of a value, promoting code reliability and consistency.
 */
export type ValueCurrentQueryParameter = string | null

/**
 * @interface AuthData
 * @description Represents the core authentication data returned by the `getSessionData` function.
 * This interface explicitly defines the required user properties, ensuring a consistent
 * and predictable data structure for all components and functions that depend on
 * user authentication status.
 */
export interface AuthData {
  id: string
  email: string | null | undefined
}

// Using a type alias to improve readability for complex mock data
export type MockResponse = Partial<ResponseObject<Partial<User>>>

export type MockCompare = (data: string, encrypted: string) => Promise<boolean>
export type MockHash = (data: string, salt: number) => Promise<string>
export type MockAuth = () => Promise<Session | null>
