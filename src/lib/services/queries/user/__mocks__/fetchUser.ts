import {
  testEmail,
  testPassword,
  testTasksPerPage,
  testUser,
  testUserId,
} from '@/lib/constants/test-const'
import { User } from '@prisma/client'

const testUserData: User = {
  email: testEmail,
  id: testUserId,
  name: testUser,
  password: testPassword,
  tasksPerPage: testTasksPerPage,
}

export const fetchUser = {
  uniqueData: jest.fn().mockResolvedValue({ data: testUserData }),
}
