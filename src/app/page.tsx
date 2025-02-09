import CreateTaskBtn from '@/ui/common/create-task-btn'
import MonitoringScreen from '@/ui/common/monitoring-screen'
import ViewTasks, {
  AccordionTaskProps,
} from '@/ui/common/view tasks/view-tasks'
import Link from 'next/link'

const tasksSample: AccordionTaskProps[] = [
  { id: '1', summary: 'Sample 1', details: 'Details task 1', priority: 'high' },
  { id: '2', summary: 'Sample 2', details: 'Details task 2', priority: 'high' },
  { id: '3', summary: 'Sample 3', details: 'Details task 3', priority: 'high' },
]

export default async function Home() {
  return (
    <>
      <h1>Home page</h1>
      <nav>
        <div>
          <Link href='/dashboard'>dashboard</Link>
        </div>
        <div>
          <Link href='/sample'>sample</Link>
        </div>
        <div>
          <Link href='/signin'>login</Link>
        </div>
      </nav>
      <MonitoringScreen
        completed={1}
        pending={3}
        progress={25}
      />
      <CreateTaskBtn />
      <ViewTasks tasks={tasksSample} />
    </>
  )
}
