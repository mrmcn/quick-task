import { testStatusCount } from '@/lib/constants/test-const'
import { ChipNamesList, SearchParameterList } from '@/lib/constants/text-const'
import { getLabel } from '@/lib/utils/helpers/get-label'
import { ChipsConfigProps } from '@/ui/dashboard/page/types'
import { Priority, Status } from '@prisma/client'

const isActive = true
const isNotActive = false

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

const priorityLabel = `${chipPriorityConfig.chipName} ${''}`
const notActiveLabel = `${chipCompletedConfig.chipName} ${''}`
const in_progressActiveLabel = `${chipPendingConfig.chipName} ${testStatusCount.in_progress}`
const completedActiveLabel = `${chipCompletedConfig.chipName} ${testStatusCount.completed}`

describe('getLabel', () => {
  test('chip does not show a count because its parameter is "Priority" or data is undefined', () => {
    expect(getLabel(isActive, chipPriorityConfig)).toBe(priorityLabel)
  })

  test('chip does not show a count because it is not active, even though other two conditions are met', () => {
    expect(getLabel(isNotActive, chipCompletedConfig, testStatusCount)).toBe(
      notActiveLabel,
    )
  })

  test('chip shows a count for "Pending" status, and we check the handling of 0', () => {
    expect(getLabel(isActive, chipPendingConfig, testStatusCount)).toBe(
      in_progressActiveLabel,
    )
  })

  test('chip shows a count for "Completed" status', () => {
    expect(getLabel(isActive, chipCompletedConfig, testStatusCount)).toBe(
      completedActiveLabel,
    )
  })
})
