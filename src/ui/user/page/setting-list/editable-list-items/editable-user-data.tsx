'use client'

import {
  FieldNameAttribute,
  updateUserEmail,
  updateUserName,
} from '@/lib/services/actions/user'
import { FetchUniqueUserData } from '@/lib/services/queries/user'
import { EditableText } from '@/ui/common/forms/editable-text'
import sxEditableTextProps from '@/ui/common/styles/sx-editable-text-props'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { User } from '@prisma/client'

export default function EditableUserData({
  userDataPromise,
  fieldName,
}: EditableUserDataProps) {
  const action = fieldName === 'email' ? updateUserEmail : updateUserName

  return (
    <EditableText
      renderEditedText={(props) => (
        <TextField
          type={fieldName}
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
      data={userDataPromise}
    />
  )
}

interface EditableUserDataProps {
  userDataPromise: FetchUniqueUserData<keyof User>
  fieldName: FieldNameAttribute
}
