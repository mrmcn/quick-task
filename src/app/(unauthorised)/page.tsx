import TasksList from '@/ui/common/tasks-list'

/**
 * @function RootPage
 * @description The root page component, serving as an entry point for unauthenticated users.
 * This page **defaults to displaying `TasksList` with sample data**,
 * giving users a preview of the application's functionality before signing in or signing up.
 * Its primary purpose is to showcase the general "picture" and encourage users to further interact (register/authenticate).
 *
 * @returns A JSX element that displays the task list (with sample data for unauthenticated users).
 */
export default function RootPage() {
  return <TasksList />
}
