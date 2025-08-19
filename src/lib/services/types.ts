import { TaskListDto } from '@/lib/db/selects'
import { HandleError } from '@/lib/utils/error-handling/types'
import { SearchParamsObject } from '@/lib/utils/types'
import { Prisma, Status } from '@prisma/client'
import { z, ZodSchema } from 'zod'

/**
 * This file contains definitions for core types and interfaces used
 * throughout the service layer of the application, particularly for data interaction,
 * Server Actions, and their handling.
 *
 * It ensures type safety and a clear understanding of the data structures
 * being passed between different layers of the application (e.g., between client components and Server Actions,
 * or between Server Actions and repositories).
 */

/**
 * A generic type for asynchronous data fetching operations.
 * A function of this type is expected to return a `Promise` that resolves to a `ResponseObject<T>`.
 * @template T The type of data expected on success.
 */
export type FetchData<T> = Promise<ResponseObject<T>>

/**
 * The type for a response object from data fetching operations.
 * It can contain either successful data (`data: T`) or error information (`error: HandleError`).
 * This ensures that the response always clearly indicates the status of the operation.
 * @template T The type of data returned on success.
 */
export type ResponseObject<T> =
  | { data: T; error?: undefined } // Successful response with data
  | { error: HandleError; data?: undefined } // Error response

/**
 * Interface for the result of fetching a user's task list.
 * Includes an array of task objects and the total number of pages for pagination.
 */
export interface UserTasksResult {
  tasks: TaskListDto[] // List of tasks, represented in a DTO (Data Transfer Object) format
  totalPages: number // Total number of pages for pagination
}

/**
 * @description Interface that holds a promise for fetching the user's task list result.
 * Used to pass the data promise between components, allowing `Suspense` to handle loading states.
 */
export interface UserTasksPromise {
  userTasksPromise: FetchData<UserTasksResult>
}

/**
 * Interface for aggregated data on the count of tasks by their statuses.
 * Uses the `Status` enum (Prisma) for keys, ensuring all statuses are included.
 */
export interface MonitoringStatesProps {
  [Status.completed]: number // Number of tasks with 'completed' status
  [Status.in_progress]: number // Number of tasks with 'in_progress' status
  // Can be extended if other statuses are introduced
}

/**
 * Interface that groups functions for fetching task-related data.
 * Used to provide type-safe access to data fetching functions.
 */
export interface FetchTask {
  /**
   * A function that returns aggregated data on the count of tasks by their statuses.
   */
  statusCounts(): FetchData<MonitoringStatesProps>
  /**
   * A function for fetching a user's task list with support for filtering and pagination.
   * @param searchParamsObject An object with search parameters.
   */
  userTasksData(
    searchParamsObject?: SearchParamsObject,
  ): FetchData<UserTasksResult>
}

/**
 * Interface that groups functions for fetching user-related data.
 */
export interface FetchUser {
  /**
   * A function for fetching unique user data with the ability to specify fields for selection.
   * @template K The type defining the fields to select from the Prisma User model.
   * @param select A Prisma `UserSelect` object that defines the fields to return.
   * @param where A Prisma `UserWhereUniqueInput` object that defines the criteria for a unique user lookup.
   */
  uniqueData<K extends Prisma.UserSelect>(
    select: K,
    where?: Prisma.UserWhereUniqueInput,
  ): FetchData<SelectedUserData<K>>
}

/**
 * The type for the result of a Server Action.
 * Can indicate the need to show a modal, an error,
 * or be `undefined` for the initial state with `useActionState`.
 */
export type ActionResult =
  | { status: 'showModal' } // Indicates the need to display a modal
  | { status: 'error'; error: HandleError } // Indicates that an error occurred
  | undefined // Initial state or state without an explicit result for useActionState

/**
 * A generic type for a Server Action handler function.
 * Accepts the current state (`state`) and form data (`payload: FormData`).
 * Returns a new state or a `Promise` that resolves to a new state.
 * @template T The type of the action's result (e.g., `ActionResult`).
 */
export type ActionHandler<T> = (
  state: Awaited<T>, // Current state of the action
  payload: FormData, // Form data submitted by the client
) => T | Promise<T>

/**
 * Configuration for the `withFormHandling` function, which wraps a Server Action.
 * Allows defining the validation schema and the action's behavior after successful execution:
 * either redirection, or returning feedback for the UI.
 * @template T The type of the Zod schema for input validation.
 */
export type ActionConfig<T extends ZodSchema> =
  | {
      schema: T // Zod schema for input validation
      action: ActionWithRedirect<T> // An action function after which a redirect occurs.
      updateAndRedirect: (formData: FormData) => Promise<never | void> // Function to revalidate cache and redirect
    }
  | {
      schema: T // Zod schema for input validation
      action: UIFeedbackAction<T> // An action function after which UI feedback occurs (without redirection).
      updateAndRedirect: undefined // Indicates that no redirection occurs
    }

/**
 * The type of an action function after which a redirect occurs.
 * Accepts the data validation result.
 * @template T The type of the Zod schema from which validated data is inferred.
 */
export type ActionWithRedirect<T extends ZodSchema> = (
  validationResult: z.infer<T>, // Validated form data
) => Promise<void> // The action does not return a value, as its completion implies a redirect

/**
 * The type of an action function that returns feedback for the UI (e.g., for displaying a modal).
 * Accepts the data validation result.
 * @template T The type of the Zod schema from which validated data is inferred.
 */
type UIFeedbackAction<T extends ZodSchema> = (
  validationResult: z.infer<T>, // Validated form data
) => Promise<{ status: 'showModal' }> // The action returns an object with a status for the UI

/**
 * Type for fetching user data from Prisma based on the specified `select` condition.
 * Uses Prisma's built-in `UserGetPayload` utility.
 * @template K The type defining the fields to select from the Prisma User model.
 */
export type SelectedUserData<K extends Prisma.UserSelect> =
  Prisma.UserGetPayload<{
    select: K // The `select` object passed to the Prisma query
  }>

/**
 * A generic type for a Server Action wrapper that can either redirect or return UI feedback.
 * Accepts the data validation result.
 * @template T The type of the Zod schema from which validated data is inferred.
 */
export type ActionWrapperProps<T extends ZodSchema> = (
  validationResult: z.infer<T>, // Validated form data
) => Promise<void | { status: 'showModal' }> // The action may either return no value (for redirection),
// or return a status for the UI (e.g., for a modal)
