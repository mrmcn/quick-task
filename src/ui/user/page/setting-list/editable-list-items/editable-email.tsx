'use client'

import { EditableUserDataProps } from '@/app/user/page'
import { TextFieldsNameAttributeList } from '@/lib/constants/text-const'
import { updateEmail } from '@/lib/services/actions/user'
import { EditableText } from '@/ui/common/forms/editable-text'
import sxEditableTextProps from '@/ui/common/styles/sx-editable-text-props'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function EditableEmail({
  userDataPromise,
}: EditableUserDataProps) {
  return (
    <EditableText
      renderEditedText={(props) => (
        <TextField
          type='email'
          id='email'
          required
          name={TextFieldsNameAttributeList.email}
          sx={sxEditableTextProps('0.8rem')}
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
