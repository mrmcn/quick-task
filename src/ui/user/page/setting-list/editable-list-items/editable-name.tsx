'use client'

import { EditableUserDataProps } from '@/app/user/page'
import { TextFieldsNameAttributeList } from '@/lib/constants/text-const'
import { updateUserName } from '@/lib/services/actions/user'
import { EditableText } from '@/ui/common/forms/editable-text'
import sxEditableTextProps from '@/ui/common/styles/sx-editable-text-props'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function EditableUserName({
  userDataPromise,
}: EditableUserDataProps) {
  return (
    <EditableText
      renderEditedText={(props) => (
        <TextField
          type='text'
          id='name'
          required
          name={TextFieldsNameAttributeList.name}
          sx={sxEditableTextProps('0.8rem')}
          {...props}
        />
      )}
      renderViewText={(props, data) => (
        <Typography {...props}>{data} </Typography>
      )}
      action={updateUserName}
      data={userDataPromise}
    />
  )
}
