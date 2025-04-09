import { ListFormNames, ListLoadingIndicator } from '@/lib/constants/text-const'
import { deleteTask, updateTask } from '@/lib/services/actions/task'
import { fetchTaskIdData, TaskId } from '@/lib/services/queries/task'
import Await from '@/lib/utils/await'
import { formatSearchParams } from '@/lib/utils/format-search-params'
import { SearchParamsObject } from '@/lib/utils/get-search-params'
import FormWrapperActionState from '@/ui/common/form-action-state/form-wrapper'
import DetailsTextField from '@/ui/common/form-action-state/text-fields/task/details'
import TitleTextField from '@/ui/common/form-action-state/text-fields/task/title'
import LoadingIndicator from '@/ui/common/loading-indicator'
import BackButton from '@/ui/dashboard/back-btn'
import { Btn } from '@/ui/dashboard/edit/btn'
import BtnWithUseFormStatus from '@/ui/dashboard/edit/btn-with-react-hook'
import PriorityToggleBtns from '@/ui/dashboard/priority-toggle-btns'
import { Suspense } from 'react'

export default async function EditTaskPage(props: EditTaskPageProps) {
  const TaskIdDataPromise = getTaskIdDataPromise(props.params)
  const searchParamsStringToGoBack = await getSearchParamsStringToGoBack(props)

  return (
    <>
      <FormWrapperActionState
        action={updateTask}
        formName={ListFormNames.updateTask}
      >
        <Suspense fallback={<TitleTextField />}>
          <Await promise={TaskIdDataPromise}>
            <TitleTextField />
          </Await>
        </Suspense>
        <Suspense fallback={<DetailsTextField />}>
          <Await promise={TaskIdDataPromise}>
            <DetailsTextField />
          </Await>
        </Suspense>
        <Suspense fallback={<PriorityToggleBtns />}>
          <Await promise={TaskIdDataPromise}>
            <PriorityToggleBtns />
          </Await>
        </Suspense>
        <Suspense>
          <Await promise={TaskIdDataPromise}>
            <InputWithTaskIdAndSearchParams
              searchParamsToGoBack={searchParamsStringToGoBack}
            />
          </Await>
        </Suspense>
        <LoadingIndicator content={ListLoadingIndicator.updata} />
        <BackButton />
      </FormWrapperActionState>
      <Suspense fallback={<Btn disabled={true} />}>
        <Await promise={TaskIdDataPromise}>
          <DeleteTaskBtn searchParamsToGoBack={searchParamsStringToGoBack} />
        </Await>
      </Suspense>
    </>
  )
}

function InputWithTaskIdAndSearchParams({ data, searchParamsToGoBack }: Props) {
  if (data)
    return (
      <>
        <input
          type='hidden'
          name='id'
          value={data.id}
        />
        <input
          type='hidden'
          name='searchParams'
          value={searchParamsToGoBack}
        />
      </>
    )
  return null
}

function DeleteTaskBtn({ data, searchParamsToGoBack }: Props) {
  return (
    <form action={deleteTask}>
      <BtnWithUseFormStatus />
      <input
        type='hidden'
        name='id'
        value={data?.id}
      />
      <input
        type='hidden'
        name='searchParams'
        value={searchParamsToGoBack}
      />
      <LoadingIndicator content={ListLoadingIndicator.deleting} />
    </form>
  )
}

async function getTaskIdDataPromise(paramsPromise: Promise<ParamsProps>) {
  const params = await paramsPromise
  const id = params.id
  return fetchTaskIdData(id)
}

async function getSearchParamsStringToGoBack(props: EditTaskPageProps) {
  const searchParamsObject = await props.searchParams
  return formatSearchParams(searchParamsObject)
}

interface EditTaskPageProps {
  params: Promise<ParamsProps>
  searchParams?: Promise<SearchParamsObject>
}

interface ParamsProps {
  id: string
}

interface Props {
  data?: TaskId
  searchParamsToGoBack: string
}
