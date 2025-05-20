'use client'

import { EditableUserDataProps } from '@/app/user/page'
import { TextFieldsNameAttributeList } from '@/lib/constants/text-const'
import { updateEmail } from '@/lib/services/actions/user'
import { EditableText } from '@/ui/common/forms/editable-text'
import textFieldSx from '@/ui/common/forms/text-fields/text-field-sx'
import EmailTextField from '@/ui/common/forms/text-fields/user/email'
import Typography from '@mui/material/Typography'

export default function EditableEmail({
  userDataPromise,
}: EditableUserDataProps) {
  return (
    <EditableText
      renderEditedText={(props) => (
        <EmailTextField
          name={TextFieldsNameAttributeList.email}
          sx={textFieldSx('0.8rem')}
          {...props}
        />
      )}
      renderViewText={(props, data) => (
        <Typography {...props}>{data}</Typography>
      )}
      action={updateEmail}
      data={userDataPromise}
    />
  )
}
