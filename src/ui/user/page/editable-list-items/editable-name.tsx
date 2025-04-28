'use client'

import { EditableUserDataProps } from '@/app/user/page'
import { EditableText } from '@/lib/components/editable-text'
import { updateUserName } from '@/lib/services/actions/user'
import textFieldSx from '@/ui/common/text-field-sx'
import TypographyWithSuspense from '@/ui/user/page/editable-list-items/typography-with-suspense'
import TextField from '@mui/material/TextField'
import { use } from 'react'

export default function EditableUserName({
  userDataPromise,
}: EditableUserDataProps) {
  const userName = use(userDataPromise).data ?? 'Error database'

  return (
    <EditableText
      renderEditedText={(props) => (
        <TextField
          type='text'
          name='name'
          id='name'
          required
          defaultValue={userName}
          sx={textFieldSx('0.8rem')}
          {...props}
        />
      )}
      renderViewText={(props) => (
        <TypographyWithSuspense
          props={props}
          userDataPromise={userDataPromise}
        />
      )}
      action={updateUserName}
    />
  )
}
