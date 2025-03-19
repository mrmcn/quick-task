import { ListFormNames, ListLoadingIndicator } from '@/lib/constants/text-const'
import { updateUserName } from '@/lib/services/actions/user'
import fetchUserData from '@/lib/services/queries/user'
import Await from '@/lib/utils/await'
import FormWrapperWithAction from '@/ui/common/form/form-wrapper-action-state'
import NameTextField from '@/ui/common/form/text-fields/user/name'
import LoadingIndicator from '@/ui/common/loading-indicator'
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
      <LoadingIndicator content={ListLoadingIndicator.updataUser} />
    </FormWrapperWithAction>
  )
}
