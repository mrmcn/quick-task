import { ListFormNames } from '@/lib/constants/text-const'
import { updateUserName } from '@/lib/services/actions/user'
import fetchUserData from '@/lib/services/queries/user'
import FormWrapperWithAction from '@/ui/common/form/form-wrapper-action-state'
import Await from '@/lib/utils/await'
import NameTextField from '@/ui/common/form/text-fields/user/name'
import { Suspense } from 'react'

export default function EditUsername() {
  const userDataPromise = fetchUserData()

  return (
    <FormWrapperWithAction
      action={updateUserName}
      formName={ListFormNames.editUserName}
    >
      <Suspense fallback={<NameTextField />}>
        <Await promise={userDataPromise}>
          <NameTextField />
        </Await>
      </Suspense>
    </FormWrapperWithAction>
  )
}
