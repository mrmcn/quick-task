import {
  testEmail,
  testId,
  testPassword,
  testTasksPerPage,
  testUser,
} from '@/lib/constants/test-const'
import { User } from '@prisma/client'

const testUserData: User = {
  email: testEmail,
  id: testId,
  name: testUser,
  password: testPassword,
  tasksPerPage: testTasksPerPage,
}

export const fetchUser = {
  uniqueData: jest.fn().mockResolvedValue({ data: testUserData }),
}
