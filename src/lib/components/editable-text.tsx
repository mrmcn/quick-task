'use client'

import { ListBtnNames } from '@/lib/constants/text-const'
import { ActionProps, StateProps } from '@/lib/services/actions/user'
import RenderErrors from '@/ui/common/form-action-state/form-wrapper/render-errors'
import { CircularProgress, InputAdornment, TextFieldProps } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { TypographyProps } from '@mui/material/Typography'
import { Dispatch, JSX, SetStateAction, useActionState, useState } from 'react'

export function EditableText({
  renderEditedText,
  renderViewText,
  action,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const typographyProps = getTypographyProps(setIsEditing)

  if (isEditing)
    return (
      <EditingForm
        action={action}
        renderEditedText={renderEditedText}
        setIsEditing={setIsEditing}
      />
    )

  return <>{renderViewText(typographyProps)}</>
}

function EditingForm({
  renderEditedText,
  action,
  setIsEditing,
}: EditFormProps) {
  const [state, formAction, isPending] = useActionState(action, undefined)
  const textFieldProps = getTextFieldProps(isPending, setIsEditing)

  return (
    <form action={formAction}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {renderEditedText(textFieldProps)}
        <Button
          type='submit'
          disabled={isPending}
          sx={{ color: 'secondary.dark' }}
          onMouseDown={(e) => {
            e.preventDefault()
          }} // Prevents focus loss from the input field
        >
          {ListBtnNames.save}
        </Button>
      </Box>
      <RenderErrors state={state} />
    </form>
  )
}

function getTextFieldProps(
  isPending: boolean,
  setIsEditing: Dispatch<SetStateAction<boolean>>,
) {
  const endAdornment = isPending ? (
    <InputAdornment position='end'>
      <CircularProgress
        size={20}
        color='secondary'
      />
    </InputAdornment>
  ) : undefined
  const handleBlur = () => {
    setIsEditing(false)
  }
  const onBlurWithPending = !isPending ? handleBlur : undefined

  return {
    disabled: isPending,
    autoFocus: true,
    onBlur: onBlurWithPending,
    margin: 'none',
    size: 'small',
    slotProps: {
      input: {
        endAdornment: endAdornment,
      },
    },
  } as TextFieldProps
}

function getTypographyProps(setIsEditing: Dispatch<SetStateAction<boolean>>) {
  const handleClick = () => {
    setIsEditing(true)
  }
  const typographyProps: TypographyProps = {
    color: 'secondary',
    onClick: handleClick,
    style: { cursor: 'pointer', display: 'inline-block' }, // Indicates that the element is clickable and restricts its width to the content.
  }
  return typographyProps
}

interface EditFormProps {
  renderEditedText: (props: TextFieldProps) => React.ReactNode
  setIsEditing: Dispatch<SetStateAction<boolean>>
  action: ActionProps<StateProps>
}

interface EditableTextProps {
  renderEditedText: (props: TextFieldProps) => React.ReactNode
  renderViewText: (props: TypographyProps) => JSX.Element
  action: ActionProps<StateProps>
}
