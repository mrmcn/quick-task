import { TextFieldsNameAttributeList } from '@/lib/constants/text-const'
import { HiddenInputsProps } from '@/ui/common/tasks-list/types'

export default function HiddenInputs({
  taskId,
  dynamicField,
}: HiddenInputsProps) {
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
        name={TextFieldsNameAttributeList.id}
        value={taskId}
      />
      {dynamicInput}
    </>
  )
}
