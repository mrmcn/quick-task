import { FormName, ListError } from '@/lib/constants/text-const'
import { updateUserName } from '@/lib/services/actions/user'
import fetchUserData, { FetchUserData } from '@/lib/services/queries/user'
import FormWrapperWithAction from '@/ui/common/form/form-wrapper-action-state'
import NameTextField from '@/ui/common/form/text-fields/user-name'
import { Suspense, use } from 'react'

export default async function EditUsername() {
  const userDataPromise = fetchUserData()

  return (
    <FormWrapperWithAction
      action={updateUserName}
      formName={FormName.editUserName}
    >
      <Suspense fallback={<NameTextField />}>
        <SuspenseItem promise={userDataPromise} />
      </Suspense>
    </FormWrapperWithAction>
  )
}

function SuspenseItem({ promise }: SuspenseItemProps) {
  const userData = use(promise)
  const name = userData.data?.name ?? ListError.noData
  return <NameTextField defaultValue={name} />
}

interface SuspenseItemProps {
  promise: FetchUserData
}
