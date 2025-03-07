import FormWrapperWithFab from '@/ui/common/form-wrapper/with-fab'
import EmailTextField from '@/ui/common/text-field/email'

export default function Loading() {
  return (
    <FormWrapperWithFab formName='Edit email'>
      <EmailTextField defaultValue='Loading...' />
    </FormWrapperWithFab>
  )
}
