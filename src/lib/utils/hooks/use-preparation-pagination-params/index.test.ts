import { FetchData, UserTasksResult } from '@/lib/services/types'

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    use: jest
      .fn()
      .mockImplementation((promise: FetchData<UserTasksResult>) => promise),
  }
})

describe('usePreparationPaginationParams', () => {
  test('', () => {})
  // Перевірка "щасливого шляху"
  // it('should return valid pagination parameters when inputs are correct', async () => {
  //   // Вхідні дані: Promise, що вирішується в ResponseObject з даними.
  //   const valueCurrentQueryParameter = '2'
  //   const userTasksPromise: FetchData<UserTasksResult> = Promise.resolve({
  //     data: {
  //       totalPages: 5,
  //       tasks: [],
  //     },
  //   })
  //   // Запускаємо хук і отримуємо його результат
  //   const { result } = renderHook(() =>
  //     usePreparationPaginationParams(
  //       valueCurrentQueryParameter,
  //       userTasksPromise,
  //     ),
  //   )
  //   // Чекаємо, доки Promise вирішиться, щоб отримати кінцевий результат
  //   await new Promise(process.nextTick)
  //   // Перевіряємо, що результат хука відповідає очікуванням
  //   expect(result.current.resolve).toEqual({
  //     currentPage: 2,
  //     countPages: 5,
  //   })
  // })
  // Перевірка помилкових сценаріїв для параметра "page"
  // it('should return "error" if currentPage parameter is invalid', async () => {
  //   const invalidParameters = [0, 1.5]
  //   const userTasksPromise: FetchData<UserTasksResult> = Promise.resolve({
  //     data: { totalPages: 10, tasks: [] },
  //   })
  //   for (const param of invalidParameters) {
  //     const { result } = renderHook(() =>
  //       usePreparationPaginationParams(param, userTasksPromise),
  //     )
  //     // Чекаємо, доки Promise вирішиться
  //     await new Promise(process.nextTick)
  //     expect(result.current.resolve).toBe('error')
  //   }
  // })
  // Перевірка помилкових сценаріїв для даних з сервера
  // it('should return "error" if totalPages from server is invalid', async () => {
  //   // В цьому масиві ми імітуємо різні помилкові стани, що їх може повернути API
  //   const userTasksPromisesWithInvalidData: Array<FetchData<UserTasksResult>> =
  //     [
  //       // Випадок, коли API повертає коректний об'єкт, але з невалідним значенням
  //       Promise.resolve({
  //         data: { totalPages: 0, tasks: [] },
  //       }),
  //       Promise.resolve({
  //         data: { totalPages: 1.5, tasks: [] },
  //       }),
  //       // Випадок, коли API повертає об'єкт помилки замість даних
  //       Promise.resolve({
  //         error: {
  //           type: 'database',
  //           message: 'Server error.',
  //           details: undefined,
  //         } as HandleError,
  //       }),
  //     ]
  //   for (const promise of userTasksPromisesWithInvalidData) {
  //     const { result } = renderHook(() =>
  //       usePreparationPaginationParams(1, promise),
  //     )
  //     await new Promise(process.nextTick)
  //     expect(result.current.resolve).toBe('error')
  //   }
  // })
})
