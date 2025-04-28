'use client'

import { EditableText } from '@/lib/components/editable-text'
import { ListFormNames, ListPlaceholder } from '@/lib/constants/text-const'
import { updatePassword } from '@/lib/services/actions/user'
import { usePasswordVisibility } from '@/lib/utils/hooks/use-password-visibility'
import textFieldSx from '@/ui/common/text-field-sx'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function EditablePassword() {
  const { type, visibilityToggle } = usePasswordVisibility()

  return (
    <EditableText
      renderEditedText={(props) => (
        <>
          <TextField
            type={type}
            name='password'
            id='password'
            required
            placeholder={ListPlaceholder.createPassword}
            sx={textFieldSx('0.8rem')}
            {...props}
          />
          {visibilityToggle}
        </>
      )}
      renderViewText={(props) => (
        <Typography {...props}>{ListFormNames.resetPassword}</Typography>
      )}
      action={updatePassword}
    />
  )
}
