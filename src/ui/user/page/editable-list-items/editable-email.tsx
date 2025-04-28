'use client'

import { EditableUserDataProps } from '@/app/user/page'
import { EditableText } from '@/lib/components/editable-text'
import { updateEmail } from '@/lib/services/actions/user'
import textFieldSx from '@/ui/common/text-field-sx'
import TypographyWithSuspense from '@/ui/user/page/editable-list-items/typography-with-suspense'
import TextField from '@mui/material/TextField'
import { use } from 'react'

export default function EditableEmail({
  userDataPromise,
}: EditableUserDataProps) {
  const userEmail = use(userDataPromise).data ?? 'Error database'

  return (
    <EditableText
      renderEditedText={(props) => (
        <TextField
          type='email'
          name='email'
          id='email'
          required
          defaultValue={userEmail}
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
      action={updateEmail}
    />
  )
}
