import { PAGES } from '@/lib/constants/routes'
import { testTaskId, testTitle } from '@/lib/constants/test-const'
import { NameAttributeList } from '@/lib/constants/text-const'
import { taskRepository } from '@/lib/repositories/prisma/tasks/taskRepository'
import { updateTaskFunctions } from '@/lib/utils/helpers/update-task-functions'
import { Task } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

jest.mock('@/lib/repositories/prisma/tasks/taskRepository')
const testValidatedData: Partial<Task> = {
  id: testTaskId,
  title: testTitle,
}

const testSearchParams = '?page=1&limit=10'
const testForm = document.createElement('form')
const testInput = document.createElement('input')
testInput.name = NameAttributeList.searchParams
testInput.value = testSearchParams
testForm.appendChild(testInput)
const testFormDataWithParams = new FormData(testForm)
const testEmptyForm = document.createElement('form')
const testFormDataWithEmptyParams = new FormData(testEmptyForm)

describe('updateTaskFunctions', () => {
  test('action: confirms the invocation of taskRepository.updateTask', async () => {
    await updateTaskFunctions.action(testValidatedData)
    expect(jest.mocked(taskRepository.updateTask)).toHaveBeenCalled()
  })
  test('updateAndRedirect: with searchParams', async () => {
    await updateTaskFunctions.updateAndRedirect(testFormDataWithParams)

    expect(revalidatePath).toHaveBeenCalledWith(PAGES.DASHBOARD)
    expect(redirect).toHaveBeenCalledWith(
      `${PAGES.DASHBOARD}${testSearchParams}`,
    )
  })
  test('updateAndRedirect: without searchParams', async () => {
    await updateTaskFunctions.updateAndRedirect(testFormDataWithEmptyParams)

    expect(revalidatePath).toHaveBeenCalledWith(PAGES.DASHBOARD)
  })
})
