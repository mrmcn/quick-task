import { debounce } from '@/lib/utils/helpers/debounce/index'

// Describes a single, comprehensive test for the debounce function.
// The test name clearly states its purpose: to verify that the function is called only once
// after a series of calls and with the specified time delay.
test('debounce should call the function only once after multiple rapid calls, and execute with the specified time delay', () => {
  // Enable Jest's fake timers. This allows us to "fast-forward" time,
  // making the test quick since we don't wait for a real 1000ms.
  jest.useFakeTimers()

  // Create a mock function (jest.fn()) to track calls.
  // Also, create the debounced function with a 1000ms delay.
  const mockFunc = jest.fn()
  const debouncedFunc = debounce(mockFunc, 1000)

  // Simulate rapid calls, which might happen during user input (e.g., typing).
  // Each call to debouncedFunc resets the previous timer.
  debouncedFunc('value_1')
  jest.advanceTimersByTime(500) // The timer is reset
  debouncedFunc('value_2')
  jest.advanceTimersByTime(500) // The timer is reset again
  debouncedFunc('value_3')

  // After the last call, we check that the mock function has not been called yet.
  // This confirms that debounce is correctly waiting for the delay.
  expect(mockFunc).not.toHaveBeenCalled()

  // "Fast-forward" time by 1000ms to simulate the end of the delay after the last call.
  jest.advanceTimersByTime(1000)

  // Final check:
  // 1. The function was called exactly once.
  // 2. It was called with the last argument passed ('value_3').
  expect(mockFunc).toHaveBeenCalledTimes(1)
  expect(mockFunc).toHaveBeenCalledWith('value_3')

  // Restore real timers to avoid affecting other tests.
  jest.useRealTimers()
})
