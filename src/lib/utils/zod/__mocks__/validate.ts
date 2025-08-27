import { testValidatedTaskTitle } from '@/lib/constants/test-const'

export const validateFormData = jest
  .fn()
  .mockReturnValue(testValidatedTaskTitle)
