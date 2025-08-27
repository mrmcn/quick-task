import { PAGES } from '@/lib/constants/routes'
import {
  testValidatedTaskTitle,
  testWithSearchParams,
} from '@/lib/constants/test-const'
import { NameAttributeList } from '@/lib/constants/text-const'
import { taskRepository } from '@/lib/repositories/prisma/tasks/taskRepository'
import { updateTaskFunctions } from '@/lib/utils/helpers/update-task-functions'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

jest.mock('@/lib/repositories/prisma/tasks/taskRepository')

const { id, ...rest } = testValidatedTaskTitle
const { action, updateAndRedirect } = updateTaskFunctions
const { updateTask } = taskRepository

const testFormDataWithParams = new FormData()
testFormDataWithParams.append(
  NameAttributeList.searchParams,
  testWithSearchParams,
)

const testFormDataWithEmptyParams = new FormData()

describe('updateTaskFunctions', () => {
  test('action: confirms the invocation of taskRepository.updateTask', async () => {
    await expect(action(testValidatedTaskTitle)).resolves.toBeUndefined()
    expect(updateTask).toHaveBeenCalledWith({ id }, rest)
  })
  test('updateAndRedirect: with searchParams', async () => {
    await updateAndRedirect(testFormDataWithParams)

    expect(revalidatePath).toHaveBeenCalledWith(PAGES.DASHBOARD)
    expect(redirect).toHaveBeenCalledWith(
      `${PAGES.DASHBOARD}${testWithSearchParams}`,
    )
  })
  test('updateAndRedirect: without searchParams', async () => {
    await updateAndRedirect(testFormDataWithEmptyParams)

    expect(revalidatePath).toHaveBeenCalledWith(PAGES.DASHBOARD)
  })
})
