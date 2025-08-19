import { ChipNamesList, SearchParameterList } from '@/lib/constants/text-const'
import { ListChipNamesValue } from '@/lib/constants/type'
import { MonitoringStatesProps } from '@/lib/services/types'
import { getLabel } from '@/lib/utils/helpers/get-label'
import { ChipsConfigProps } from '@/ui/dashboard/page/types'
import { Priority, Status } from '@prisma/client'

// The data object used for testing, including a zero value for an edge case test.
const testData: MonitoringStatesProps = {
  [Status.completed]: 5,
  [Status.in_progress]: 0,
}

/**
 * Helper function to create the expected label string for tests.
 * This ensures the test output logic is consistent with the function being tested.
 */
const getExpectedLabel = (
  chipName: ListChipNamesValue,
  number: number | '',
) => {
  return `${chipName} ${number}`
}

const isActive = true
const isNotActive = false

// Chip configuration objects used for various test scenarios.
const chipCompletedConfig: ChipsConfigProps = {
  chipName: ChipNamesList.completed,
  filterValue: Status.completed,
  filteringParam: SearchParameterList.status,
  asyncChip: true,
}

const chipPriorityConfig: ChipsConfigProps = {
  chipName: ChipNamesList.priorityHigh,
  filterValue: Priority.high,
  filteringParam: SearchParameterList.priority,
  asyncChip: false,
}

const chipPendingConfig: ChipsConfigProps = {
  chipName: ChipNamesList.pending,
  filterValue: Status.in_progress,
  filteringParam: SearchParameterList.status,
  asyncChip: true,
}

describe('getLabel', () => {
  test('chip does not show a count because its parameter is "Priority" or data is undefined', () => {
    // `data` is not passed, implicitly undefined.
    expect(getLabel(isActive, chipPriorityConfig)).toBe(
      getExpectedLabel(chipPriorityConfig.chipName, ''),
    )
  })

  test('chip does not show a count because it is not active, even though other two conditions are met', () => {
    expect(getLabel(isNotActive, chipCompletedConfig, testData)).toBe(
      getExpectedLabel(chipCompletedConfig.chipName, ''),
    )
  })

  test('chip shows a count for "Pending" status, and we check the handling of 0', () => {
    expect(getLabel(isActive, chipPendingConfig, testData)).toBe(
      getExpectedLabel(chipPendingConfig.chipName, testData.in_progress),
    )
  })

  test('chip shows a count for "Completed" status', () => {
    expect(getLabel(isActive, chipCompletedConfig, testData)).toBe(
      getExpectedLabel(chipCompletedConfig.chipName, testData.completed),
    )
  })
})
