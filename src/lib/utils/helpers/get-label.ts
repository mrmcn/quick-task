import { ListSearchParameter } from '@/lib/constants/text-const'
import { MonitoringStatesProps } from '@/lib/services/types'
import { ChipsConfigProps } from '@/ui/dashboard/page/chips-block/types'

/**
 * @description Generates the text label for a Chip component, combining its name
 * with a corresponding count, if the chip is active and filters by status.
 * This function is used to dynamically update chip labels within a filtering block.
 *
 * @param  isActive - Indicates whether the chip is currently active (i.e., its filter is applied).
 * @param  chipConfig - The chip's configuration object, containing its name (`chipName`),
 * filtering parameter (`filteringParam`), and filter value (`filterValue`).
 * @param - Optional object containing counts
 * for different monitoring states. Provided only for status-displaying chips.
 * @returns  - The constructed label string for the chip, e.g., "All tasks" or "Completed 5".
 */
export const getLabel = (
  isActive: boolean,
  chipConfig: ChipsConfigProps,
  data?: MonitoringStatesProps,
) => {
  // Initialize the `number` variable as an empty string. It will hold the item count
  // if the chip is active and its `filteringParam` is a status.
  const number =
    // Check three conditions for displaying a count on the chip:
    // 1. The chip is active (`isActive`).
    // 2. `data` is provided (meaning it's a chip that can potentially display counts).
    // 3. The chip's filtering parameter (`chipConfig.filteringParam`) matches the status parameter
    //    (`ListSearchParameter.status`).
    isActive && data && chipConfig.filteringParam === ListSearchParameter.status
      ? // If all conditions are true, retrieve the count from the `data` object
        // using `filterValue` as the key.
        data[chipConfig.filterValue as keyof MonitoringStatesProps]
      : // Otherwise, no number is displayed.
        ''
  // Return the combined label, consisting of the chip's name and (if applicable) the count.
  return `${chipConfig.chipName} ${number}`
}
