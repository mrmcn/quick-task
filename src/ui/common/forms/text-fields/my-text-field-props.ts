import {
  ListLabelsValue,
  ListPlaceholderValue,
  TextFieldsNameAttributeListValue,
} from '@/lib/constants/text-const'
import { TextFieldProps } from '@mui/material'

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
 * - 'type', 'id', 'required': Fields are defined directly in the custom component (e.g., `TitleTextField` has `type='text'`).
 */
export type RenderProps = Omit<
  TextFieldProps,
  'name' | 'placeholder' | 'label' | 'type' | 'id' | 'required'
>
/**
 * The `MyTextFieldProps` interface defines the structure of props expected by
 * custom TextField components (e.g., DetailsTextField, TitleTextField, etc.).
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
