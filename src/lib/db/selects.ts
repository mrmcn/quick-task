import { Prisma } from '@prisma/client'

export const USER_DATA_SELECT = {
  name: true,
  email: true,
} as const satisfies Prisma.UserSelect

export const AUTH_DATA_SELECT = {
  id: true,
  email: true,
  password: true,
} as const satisfies Prisma.UserSelect

export const TASK_DATA_SELECT = {
  id: true,
  title: true,
  details: true,
  priority: true,
  status: true,
} as const satisfies Prisma.TaskSelect

export type TaskListDto = Prisma.TaskGetPayload<{
  select: typeof TASK_DATA_SELECT
}>

export type AuthListDto = Prisma.UserGetPayload<{
  select: typeof AUTH_DATA_SELECT
}>

export type UserListDto = Prisma.UserGetPayload<{
  select: typeof USER_DATA_SELECT
}>
