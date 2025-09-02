import { debounce } from '@/lib/utils/helpers/debounce/index'

const mockMainFunction = jest.fn()
const customDelay = 900
const lessSetDelay = 500
const defaultDelay = 1000
const zeroDelay = 0
const debouncedFunc = debounce(mockMainFunction, customDelay)
const defaultDebouncedFunc = debounce(mockMainFunction)
const zeroDebouncedFunc = debounce(mockMainFunction, zeroDelay)
const firstIntermediateValue = 'one'
const secondIntermediateValue = 'two'
const finalValue = 'tree'
const expectedValue = finalValue

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })
  describe('should call the main function', () => {
    test('when the timeout is the default', () => {
      defaultDebouncedFunc(finalValue)
      jest.advanceTimersByTime(defaultDelay)

      expect(mockMainFunction).toHaveBeenCalledTimes(1)
    })

    test('when the set time has passed', () => {
      debouncedFunc(finalValue)
      jest.advanceTimersByTime(customDelay)

      expect(mockMainFunction).toHaveBeenCalledTimes(1)
      expect(mockMainFunction).toHaveBeenCalledWith(expectedValue)
    })
    test('when the set time is 0', () => {
      zeroDebouncedFunc(finalValue)

      expect(mockMainFunction).not.toHaveBeenCalled()
      jest.advanceTimersByTime(zeroDelay)

      expect(mockMainFunction).toHaveBeenCalledTimes(1)
    })
    test('only once when debounce is called multiple times', () => {
      debouncedFunc(firstIntermediateValue)
      jest.advanceTimersByTime(lessSetDelay)

      debouncedFunc(secondIntermediateValue)
      jest.advanceTimersByTime(lessSetDelay)

      debouncedFunc(finalValue)
      jest.advanceTimersByTime(customDelay)

      expect(mockMainFunction).toHaveBeenCalledTimes(1)
      expect(mockMainFunction).toHaveBeenCalledWith(finalValue)
    })
  })

  describe('should not call the main function', () => {
    test('when the set time has not passed', () => {
      debouncedFunc(finalValue)
      jest.advanceTimersByTime(customDelay - 1)

      expect(mockMainFunction).not.toHaveBeenCalled()
    })
    test('when clearTimeout(timer) is triggered before the set time', () => {
      debouncedFunc(firstIntermediateValue)
      jest.advanceTimersByTime(lessSetDelay)

      debouncedFunc(secondIntermediateValue)
      jest.advanceTimersByTime(lessSetDelay)

      debouncedFunc(finalValue)

      expect(mockMainFunction).not.toHaveBeenCalled()
    })
  })
})
