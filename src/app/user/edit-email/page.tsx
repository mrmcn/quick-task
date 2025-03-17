import { FormName, ListError } from '@/lib/constants/text-const'
import { updateEmail } from '@/lib/services/actions/user'
import fetchUserData, { FetchUserData } from '@/lib/services/queries/user'
import FormWrapperWithAction from '@/ui/common/form/form-wrapper-action-state'
import EmailTextField from '@/ui/common/form/text-fields/email'
import { Suspense, use } from 'react'

export default async function EditEmail() {
  const userDataPromise = fetchUserData()

  return (
    <FormWrapperWithAction
      action={updateEmail}
      formName={FormName.editEmail}
    >
      <Suspense fallback={<EmailTextField />}>
        <SuspenseItem promise={userDataPromise} />
      </Suspense>
    </FormWrapperWithAction>
  )
}

function SuspenseItem({ promise }: SuspenseItemProps) {
  const userData = use(promise)
  const email = userData.data?.email ?? ListError.noData
  return <EmailTextField defaultValue={email} />
}

interface SuspenseItemProps {
  promise: FetchUserData
}
