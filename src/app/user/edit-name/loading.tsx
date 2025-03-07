import FormWrapperWithFab from '@/ui/common/form-wrapper/with-fab'
import NameTextField from '@/ui/common/text-field/user-name'

export default function Loading() {
  return (
    <FormWrapperWithFab formName='Edit user name'>
      <NameTextField defaultValue='Loading...' />
    </FormWrapperWithFab>
  )
}
