import { ListFormNames } from '@/lib/constants/text-const'
import { updateEmail } from '@/lib/services/actions/user'
import fetchUserData from '@/lib/services/queries/user'
import FormWrapperWithAction from '@/ui/common/form/form-wrapper-action-state'
import EmailTextField from '@/ui/common/form/text-fields/user/email'
import Await from '@/lib/utils/await'
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
    </FormWrapperWithAction>
  )
}
