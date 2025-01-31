import { fetchDisplayData } from '@/lib/data'
import ControlDisplay from '../common/control-display'
import ProgressDisplay from '../common/progress-display'

export default async function DashboardControlDisplay() {
  const { completed, pending, progress } = await fetchDisplayData()

  return (
    <ControlDisplay>
      <ProgressDisplay
        name='Completed tasks'
        value={completed}
      />
      <ProgressDisplay
        name='Pending tasks'
        value={pending}
      />
      <ProgressDisplay
        name='Progress'
        value={`${progress} %`}
      />
    </ControlDisplay>
  )
}
