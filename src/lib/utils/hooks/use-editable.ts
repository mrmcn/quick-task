'use client'

import { DetailsTextFieldProps } from '@/ui/common/forms/text-fields/task/details'
import { TitleTextFieldProps } from '@/ui/common/forms/text-fields/task/title'
import { TypographyProps } from '@mui/material/Typography'
import { cloneElement, ReactElement, useState } from 'react'

export function useEditable(
  mainEditComponent: ReactElement<AllTextFieldProps>,
  viewComponent: ReactElement<TypographyProps>,
) {
  const [isEditing, setIsEditing] = useState(false)
  const handleBlur = () => {
    setIsEditing(false)
  }
  const handleClick = () => {
    setIsEditing(true)
  }

  const mainEditComponentWithBlur = cloneElement(mainEditComponent, {
    ...mainEditComponent.props,
    onBlur: handleBlur,
  })

  const viewComponentWithClick = cloneElement(viewComponent, {
    ...viewComponent.props,
    onClick: handleClick,
  })

  return { isEditing, mainEditComponentWithBlur, viewComponentWithClick }
}

export type AllTextFieldProps = TitleTextFieldProps | DetailsTextFieldProps
