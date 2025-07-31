import { NameAttributeList } from '@/lib/constants/text-const'
import { HiddenInputsProps } from '@/ui/common/tasks-list/types'

/**
 * @component HiddenInputs
 * @description The `HiddenInputs` component renders hidden input fields.
 * These fields are used to pass invisible data (such as a task ID or dynamic parameters)
 * to Server Actions when forms are submitted.
 * This ensures that necessary data is always available on the server without being displayed in the DOM.
 *
 * @param taskId - The unique identifier of the task to be passed.
 * @param  [dynamicField] - An optional object containing an additional dynamic hidden field.
 * @property dynamicField.name - The `name` attribute for the dynamic hidden field.
 * @property dynamicField.value - The value of the dynamic hidden field.
 *
 * @returns A fragment containing one or two hidden input fields.
 */
export default function HiddenInputs({
  taskId,
  dynamicField,
}: HiddenInputsProps) {
  // Dynamically create a hidden input field if `dynamicField` is provided.
  // If `dynamicField` is missing or `undefined`, the variable remains `undefined`,
  // and the corresponding field is not rendered.
  const dynamicInput = dynamicField ? (
    <input
      type='hidden'
      name={dynamicField.name}
      value={dynamicField.value}
    />
  ) : undefined

  return (
    <>
      <input
        type='hidden'
        name={NameAttributeList.id}
        value={taskId}
      />
      {dynamicInput}
    </>
  )
}
