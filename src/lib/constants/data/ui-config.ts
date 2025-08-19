import {
  BtnNamesList,
  ChipNamesList,
  SearchParameterList,
  SortingParameterList,
} from '@/lib/constants/text-const'
import { PageValue } from '@/lib/constants/type'
import { ChipsConfigProps } from '@/ui/dashboard/page/types'
import { Priority, Status } from '@prisma/client'

/**
 * Configuration for "chip" components used for filtering and displaying task status
 * on the dashboard page. Each object in this array defines:
 * - `chipName`: The text displayed on the chip (from `ListChipNames`).
 * - `filterValue`: The value that will be used to filter data (e.g., 'high' for priority).
 * - `filteringParam`: The query parameter (URL parameter) to which the filter applies (e.g., 'priority' or 'status').
 * - `asyncChip`: A boolean indicating whether the chip requires asynchronous data loading
 * (e.g., to display task counts like 'Completed (5)').
 * Chips with `asyncChip: true` will be rendered using the `AsyncChipContent` component.
 */
export const LIST_CHIPS_CONFIG: ChipsConfigProps[] = [
  {
    chipName: ChipNamesList.priorityHigh,
    filterValue: Priority.high,
    filteringParam: SearchParameterList.priority,
    asyncChip: false, // Does not require asynchronous data
  },
  {
    chipName: ChipNamesList.priorityLow,
    filterValue: Priority.low,
    filteringParam: SearchParameterList.priority,
    asyncChip: false, // Does not require asynchronous data
  },
  {
    chipName: ChipNamesList.completed,
    filterValue: Status.completed,
    filteringParam: SearchParameterList.status,
    asyncChip: true, // Requires asynchronous data (e.g., count of completed tasks)
  },
  {
    chipName: ChipNamesList.pending,
    filterValue: Status.in_progress,
    filteringParam: SearchParameterList.status,
    asyncChip: true, // Requires asynchronous data (e.g., count of in-progress tasks)
  },
]

/**
 * Configuration for sorting options used in the Select dropdown
 * on the dashboard page. Each object defines:
 * - `value`: The internal value corresponding to the sorting parameter for API requests (from `ListSortingParameter`).
 * - `content`: The text displayed to the user in the dropdown and on the selected chip (from `ListBtnNames`).
 * `as const` ensures read-only properties and accurate type inference.
 */
export const sortOptionsConfig = [
  { value: SortingParameterList.titleAsc, content: BtnNamesList.titleAtoZ },
  { value: SortingParameterList.titleDesc, content: BtnNamesList.titleZtoA },
  {
    value: SortingParameterList.dateDesc,
    content: BtnNamesList.newestToOldest,
  },
  { value: SortingParameterList.dateAsc, content: BtnNamesList.oldestToNewest },
] as const

/**
 * The `PAGE_VALUE` constant defines the allowed values for the number of items per page (pagination).
 * These values are used in user settings, specifically in the `PageSelect` component,
 * to allow users to choose how many tasks to display on a single page.
 * `as const` ensures read-only properties and accurate type inference.
 */
export const PAGE_VALUE = [3, 4, 5, 7, 10] as const

/**
 * Constant defining the width (in pixels) of the hidden area that is revealed
 * when an element is swiped on mobile devices. Used in swipe logic
 * to display additional actions (e.g., edit/delete buttons).
 */
export const SWIPE_HIDDEN_WIDTH_MOBILE = 60

/**
 * Constant defining the width (in pixels) of the hidden area that is revealed
 * when an element is swiped on desktop devices. Typically larger than the mobile version
 * for a better mouse/trackpad experience.
 */
export const SWIPE_HIDDEN_WIDTH_DESKTOP = 100

/**
 * Constant defining the swipe threshold percentage for an action to trigger.
 * This means a swipe must exceed this percentage of the `SWIPE_HIDDEN_WIDTH`
 * for the hidden actions to be fully revealed (or for the swipe to "snap" into place).
 * For example, 0.3 means the swipe must exceed 30% of the hidden width.
 */
export const SWIPE_THRESHOLD_PERCENTAGE = 0.3

export const defaultTaskPerPage: PageValue = 3
