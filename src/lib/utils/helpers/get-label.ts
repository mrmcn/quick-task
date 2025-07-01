import { ListSearchParameter } from '@/lib/constants/text-const'
import { MonitoringStatesProps } from '@/lib/services/types'
import { ChipsConfigProps } from '@/ui/dashboard/page/chips-block/types'

const getLabel = (
  isActive: boolean,
  chipConfig: ChipsConfigProps,
  data?: MonitoringStatesProps,
) => {
  const number =
    isActive && data && chipConfig.filteringParam === ListSearchParameter.status
      ? data[chipConfig.filterValue as keyof MonitoringStatesProps]
      : ''
  return `${chipConfig.chipName} ${number}`
}

export default getLabel
