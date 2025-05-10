'use client'

import { EditableUserDataProps } from '@/app/user/page'
import { updateEmail } from '@/lib/services/actions/user'
import { EditableText } from '@/ui/common/forms/editable-text'
import textFieldSx from '@/ui/common/forms/text-fields/text-field-sx'
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
          name='email'
          id='email'
          required
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
