'use client'

import { EditableUserDataProps } from '@/app/user/page'
import { TextFieldsNameAttributeList } from '@/lib/constants/text-const'
import { updateUserName } from '@/lib/services/actions/user'
import { EditableText } from '@/ui/common/forms/editable-text'
import textFieldSx from '@/ui/common/forms/text-fields/text-field-sx'
import NameTextField from '@/ui/common/forms/text-fields/user/name'
import Typography from '@mui/material/Typography'

export default function EditableUserName({
  userDataPromise,
}: EditableUserDataProps) {
  return (
    <EditableText
      renderEditedText={(props) => (
        <NameTextField
          name={TextFieldsNameAttributeList.name}
          sx={textFieldSx('0.8rem')}
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
