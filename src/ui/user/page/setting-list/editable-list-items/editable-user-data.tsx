'use client'

import {
  ActionProps,
  FieldNameAttribute,
  StateProps,
} from '@/lib/services/actions/types'
import { FetchUniqueUserData } from '@/lib/services/queries/types'
import { EditableText } from '@/ui/common/forms/editable-text'
import sxEditableTextProps from '@/ui/common/styles/sx-editable-text-props'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { User } from '@prisma/client'

export default function EditableUserData({
  userDataPromise,
  fieldName,
  action,
}: EditableUserDataProps) {
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
  action: ActionProps<StateProps>
}
