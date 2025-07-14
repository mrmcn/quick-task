/**
 * @description Creates a debounced function that limits how often another function is called.
 * This means that `func` will only be executed after a specified `timeout` has passed
 * without any new calls to the debounced function. It's commonly used to optimize event handlers
 * that might fire very frequently (e.g., typing in a search field, window resizing).
 *
 * @param  func - The function to be debounced (to limit its calls).
 * It will accept a single argument of type `string`.
 * @param - The delay in milliseconds before `func` is executed
 * after its last invocation. Defaults to 1000 ms (1 second).
 * @returns - A wrapper function that accepts the same `value` argument
 * and manages the calls to the original `func`.
 */
export const debounce = (func: { (value: string): void }, timeout = 1000) => {
  // The `timer` variable stores the timeout ID, allowing it to be cleared.
  // It's declared outside the returned function to maintain its state across debounce calls.
  let timer: NodeJS.Timeout | undefined

  // Returns a new function that will actually be called instead of the original `func`.
  return (value: string) => {
    // Each time the debounced function is called, we clear any existing previous timer.
    // This "resets" the countdown.
    clearTimeout(timer)

    // Sets a new timer. The original `func` will only be called after `timeout` has elapsed
    // and if no new calls to the debounced function occurred during that period.
    timer = setTimeout(() => {
      func(value) // Invokes the original function with the latest provided value.
    }, timeout)
  }
}
