'use client'

import { updateEmail } from '@/lib/actions'
import TextField from '@mui/material/TextField'
import FormWrapper from '../common/form-wrapper'

export default function EmailEditingForm({ email }: { email: string }) {
  return (
    <FormWrapper
      fn={updateEmail}
      formName='Edit email'
    >
      <TextField
        autoFocus
        defaultValue={email}
        label='Email'
        type='text'
        name='email'
        required
        fullWidth
        margin='dense'
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />
    </FormWrapper>
  )
}
