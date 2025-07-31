'use client'

import { EditableText } from '@/ui/common/forms/editable-text'
import { EditableUserDataProps } from '@/ui/common/forms/editable-text/types'
import sxEditableTextProps from '@/ui/common/styles/sx-editable-text-props'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useMemo } from 'react'

/**
 * @function EditableUserData
 * @description A client component used for displaying and editing
 * specific user data fields (e.g., name or email).
 * It encapsulates display and editing logic using the `EditableText` component,
 * providing custom renders for view and edit modes.
 *
 * @param userDataPromise - A Promise that resolves with user data.
 * @param fieldName - The name of the user data field to display/edit ('name' or 'email').
 * @param action - The server action to be called to update the data.
 * @returnsAn `EditableText` component configured for user data.
 */
export default function EditableUserData({
  userDataPromise,
  fieldName,
  action,
}: EditableUserDataProps) {
  // Determine the input field type (text or email) based on fieldName.
  const type = fieldName === 'name' ? 'text' : 'email'

  // Memoize the data object that will be passed to EditableText.
  // This prevents unnecessary re-creation of the object if fieldName or userDataPromise haven't changed.
  const data = useMemo(
    () => ({ key: fieldName, promise: userDataPromise }),
    [fieldName, userDataPromise],
  )

  return (
    <EditableText
      // Function to render the input field in edit mode.
      renderEditedText={(props) => (
        <TextField
          type={type}
          id={fieldName}
          required
          name={fieldName}
          sx={sxEditableTextProps('0.8rem')}
          {...props} // Pass other props from EditableText (e.g., value, onChange).
        />
      )}
      // Function to render the text in view mode.
      renderViewText={(props, data) => (
        <Typography {...props}>{data}</Typography>
      )}
      action={action} // Pass the server action to handle saving.
      data={data} // Pass the memoized data (field key and Promise).
    />
  )
}
