import {
  ListChipNamesValue,
  ListSearchParameterValue,
} from '@/lib/constants/type'
import { FetchData, MonitoringStatesProps } from '@/lib/services/types'
import { Priority, Status } from '@prisma/client'

interface ChipConfig {
  chipConfig: ChipsConfigProps
}

export interface ChipsConfigProps {
  chipName: ListChipNamesValue
  filterValue: Priority | Status
  filteringParam: FilteringParam
  asyncChip: boolean
}

export interface ChipContentProps extends ChipConfig {
  data?: MonitoringStatesProps
}

export interface AsyncChipContentProps extends ChipConfig {
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

export interface SearchProps {
  placeholder: string
}
