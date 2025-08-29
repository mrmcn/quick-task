import {
  testDBError,
  testDBErrorThrow,
  testSchemaUpdateTitle,
  testTaskId,
  testTitle,
  testValidatedTaskTitle,
  testZodError,
  testZodErrorThrow,
} from '@/lib/constants/test-const'
import { NameAttributeList } from '@/lib/constants/text-const'
import { ActionConfig } from '@/lib/services/types'
import { mockedHandleError } from '@/lib/test-mocked-function/handle-error'
import { mockedValidateFormData } from '@/lib/test-mocked-function/validate-formdata'
import withFormHandling from '@/lib/utils/helpers/with-form-handling/wrapper'
import { validateFormData } from '@/lib/utils/zod/validate'
import { z } from 'zod'

jest.mock('@/lib/utils/zod/validate')
jest.mock('@/lib/utils/error-handling')

// updateAndRedirect stack
const mockedUpdateAndRedirect = jest.fn(async () => {})

// action stack
const testActionResultWithStatus = { status: 'showModal' as const }
const mockedActionReturnVoid = jest.fn(async () => {})
const mockedActionReturnStatus = jest.fn(async () => testActionResultWithStatus)

// props stack
const testFormData = new FormData()
testFormData.append(NameAttributeList.id, testTaskId)
testFormData.append(NameAttributeList.title, testTitle)

const testWithRedirectActionConfig = {
  schema: testSchemaUpdateTitle,
  action: mockedActionReturnVoid,
  updateAndRedirect: mockedUpdateAndRedirect,
}
const testUIFeedbackActionConfig = {
  schema: testSchemaUpdateTitle,
  action: mockedActionReturnStatus,
  updateAndRedirect: undefined,
}

async function testWithFormHandling<T extends z.ZodTypeAny>(
  actionConfig: ActionConfig<T>,
) {
  const handler = withFormHandling(actionConfig)
  const handlerResult = await handler(undefined, testFormData)
  return handlerResult
}

describe('withFormHandling', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedValidateFormData.mockReturnValue(testValidatedTaskTitle)
  })

  it('should return "showModal" status when provided with a UI feedback action config', async () => {
    const handlerResult = await testWithFormHandling(testUIFeedbackActionConfig)

    expect(validateFormData).toHaveBeenCalledWith(
      testUIFeedbackActionConfig.schema,
      testFormData,
    )
    expect(testUIFeedbackActionConfig.action).toHaveBeenCalledWith(
      testValidatedTaskTitle,
    )
    expect(handlerResult).toEqual(testActionResultWithStatus)
  })

  it('should return undefined and call updateAndRedirect when provided with a redirect action config', async () => {
    const handlerResult = await testWithFormHandling(
      testWithRedirectActionConfig,
    )

    expect(handlerResult).toBeUndefined()
    expect(testWithRedirectActionConfig.updateAndRedirect).toHaveBeenCalledWith(
      testFormData,
    )
  })

  it('should return an error status when validateFormData throws a Zod error', async () => {
    mockedValidateFormData.mockImplementationOnce(testZodErrorThrow)
    mockedHandleError.mockReturnValueOnce(testZodError)

    const handlerResult = await testWithFormHandling(testUIFeedbackActionConfig)

    expect(handlerResult).toEqual({
      status: 'error',
      error: testZodError,
    })
  })

  it('should return an error status when the action function throws an error', async () => {
    mockedActionReturnVoid.mockImplementationOnce(testDBErrorThrow)
    mockedHandleError.mockReturnValue(testDBError)

    const handlerResult = await testWithFormHandling(
      testWithRedirectActionConfig,
    )

    expect(handlerResult).toEqual({
      status: 'error',
      error: testDBError,
    })
  })
})
