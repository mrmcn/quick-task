import { ListFormNames, ListLoadingIndicator } from '@/lib/constants/text-const'
import { updateEmail } from '@/lib/services/actions/user'
import fetchUserData from '@/lib/services/queries/user'
import Await from '@/lib/utils/await'
import FormWrapperWithAction from '@/ui/common/form-action-state/form-wrapper'
import EmailTextField from '@/ui/common/form-action-state/text-fields/user/email'
import LoadingIndicator from '@/ui/common/loading-indicator'
import { Suspense } from 'react'

export default async function EditEmail() {
  const userDataPromise = fetchUserData()

  return (
    <FormWrapperWithAction
      action={updateEmail}
      formName={ListFormNames.editEmail}
    >
      <Suspense fallback={<EmailTextField />}>
        <Await promise={userDataPromise}>
          <EmailTextField />
        </Await>
      </Suspense>
      <LoadingIndicator content={ListLoadingIndicator.updataUser} />
    </FormWrapperWithAction>
  )
}
