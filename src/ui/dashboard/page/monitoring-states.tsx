import { fetchMonitoringStates } from '@/lib/data'
import MonitoringScreen from '@/ui/common/monitoring-states/monitor'

export default async function MonitoringStates() {
  const monitoringStates = await fetchMonitoringStates()

  return <MonitoringScreen dataMonitoring={monitoringStates} />
}
