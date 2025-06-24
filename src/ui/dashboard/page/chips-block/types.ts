import {
  ListChipNamesValue,
  ListSearchParameterValue,
} from '@/lib/constants/type'
import { FetchData, MonitoringStatesProps } from '@/lib/services/queries/types'
import { Priority, Status } from '@prisma/client'

export interface ChipsConfigProps {
  chipName: ListChipNamesValue
  filterValue: Priority | Status
  filteringParam: FilteringParam
  asyncChip: boolean
}

export interface ChipContentProps {
  data?: MonitoringStatesProps
  chipConfig: ChipsConfigProps
}

export interface AsyncChipContentProps {
  chipConfig: ChipsConfigProps
  statusStatePromise: FetchData<MonitoringStatesProps>
}

export type FilteringParam = Extract<
  ListSearchParameterValue,
  'status' | 'priority'
>

export type FilterParamsProps = Pick<
  ChipsConfigProps,
  'filterValue' | 'filteringParam'
>
