'use client'

import { EditableText } from '@/ui/common/forms/editable-text'
import { EditableUserDataProps } from '@/ui/common/forms/editable-text/types'
import sxEditableTextProps from '@/ui/common/styles/sx-editable-text-props'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function EditableUserData({
  userDataPromise,
  fieldName,
  action,
}: EditableUserDataProps) {
  const type = fieldName === 'name' ? 'text' : 'email'

  return (
    <EditableText
      renderEditedText={(props) => (
        <TextField
          type={type}
          id={fieldName}
          required
          name={fieldName}
          sx={sxEditableTextProps('0.8rem')}
          {...props}
        />
      )}
      renderViewText={(props, data) => (
        <Typography {...props}>{data}</Typography>
      )}
      action={action}
      data={{ key: fieldName, promise: userDataPromise }}
    />
  )
}
