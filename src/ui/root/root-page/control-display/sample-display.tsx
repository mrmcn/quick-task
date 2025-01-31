import ControlDisplay from '@/ui/common/control-display'
import ProgressDisplay from '../../../common/progress-display'

export default function SampleControlDisplay() {
  return (
    <ControlDisplay>
      <ProgressDisplay
        name='Completed tasks'
        value='3'
      />
      <ProgressDisplay
        name='Pending tasks'
        value='0'
      />
      <ProgressDisplay
        name='Progress'
        value='0%'
      />
    </ControlDisplay>
  )
}
