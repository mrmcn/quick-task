import { TextFieldsNameAttributeList } from '@/lib/constants/text-const'
import { TaskListDto } from '@/lib/repositories/prisma/tasks'

export default function HiddenInputs({
  dynamicField,
  taskId,
}: HiddenInputsProps) {
  return (
    <>
      <input
        type='hidden'
        name={TextFieldsNameAttributeList.id}
        value={taskId}
      />
      <input
        type='hidden'
        name={dynamicField.name}
        value={dynamicField.value}
      />
    </>
  )
}

interface HiddenInputsProps {
  taskId: TaskListDto['id']
  dynamicField: { name: string; value: string }
}
