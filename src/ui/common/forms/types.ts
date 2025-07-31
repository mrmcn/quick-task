import {
  ListBtnNamesValue,
  ListFormNamesValue,
  ListLabelsValue,
  ListPlaceholderValue,
  TextFieldsNameAttributeListValue,
} from '@/lib/constants/type'
import { ActionHandler, ActionResult } from '@/lib/services/types'
import { TextFieldProps } from '@mui/material'

interface UIContent {
  btnName: ListBtnNamesValue
  formName: ListFormNamesValue
}

/**
 * Interface for the AuthForm component's properties.
 * Defines the expected props to ensure type safety and clarity.
 */
export interface AuthFormProps extends UIContent {
  action: ActionHandler<ActionResult>
  emailPlaceholder: ListPlaceholderValue
  passwordPlaceholder: ListPlaceholderValue
}

/**
 * Interface for the PageFormContainer component's properties.
 * Defines the expected props to ensure type safety.
 */
export interface PageFormProps extends UIContent {
  children: React.ReactNode
  disabled: boolean
  state: ActionResult
}

/**
 * Interface for the MyButton component's properties.
 * It extends `Pick<UIContent, 'btnName'>`.
 * Defines the expected props to ensure type safety and clarity.
 */
export interface MyButtonProps extends Pick<UIContent, 'btnName'> {
  disabled?: boolean // Optional prop, indicates whether the button should be disabled.
}

/**
 * Interface for the ValidationErrorMessage component's properties.
 * Defines the expected props to ensure type safety.
 */
export interface ErrorMessageProps {
  nameField: string
  value: string[]
}

/**
 * `RenderProps` defines a set of props that are passed to the `renderEditedText` function
 * of the `EditableText` component. These props include the standard props of `<TextField>`
 * from Material UI, except for those that are handled or controlled
 * directly within the logic of `EditableText` or set via `MyTextFieldProps`.
 *
 * Excluded props:
 * - 'name': Set separately via `MyTextFieldProps` to ensure type safety of field names.
 * - 'placeholder': Set separately via `MyTextFieldProps` using defined constants.
 * - 'label': Set separately via `MyTextFieldProps` using defined constants.
 * - 'type', 'id', 'required': Fields are defined directly in the custom component (e.g., `MyTextField` has `type='text'`).
 */
export type RenderProps = Omit<
  TextFieldProps,
  'name' | 'placeholder' | 'label' | 'type' | 'id' | 'required'
>
/**
 * The `MyTextFieldProps` interface defines the structure of props expected by
 * custom TextField components (e.g.,  MyTextField, etc.).
 * It extends `RenderProps` to include additional props specific to the usage,
 * such as `name`, `placeholder`, and `label`, which are associated with the corresponding constants.
 */
export interface MyTextFieldProps extends RenderProps {
  /**
   * The required name of the text field. The value of this prop must be
   * one of the values defined in the `ListAttributeNameValue` type
   * (e.g., 'email', 'password', 'name').
   */
  name: TextFieldsNameAttributeListValue
  id: TextFieldsNameAttributeListValue

  /**
   * The optional placeholder for the text field. The expected value
   * is a key from the object corresponding to the `ListPlaceholderProps` type
   * (e.g., the key 'editUserName', whose value is the placeholder string).
   */
  placeholder?: ListPlaceholderValue

  /**
   * The optional label for the text field. The expected value
   * is a key from the object corresponding to the `ListLabelsProps` type
   * (e.g., the key 'email', whose value is the label string).
   */
  label?: ListLabelsValue
}
