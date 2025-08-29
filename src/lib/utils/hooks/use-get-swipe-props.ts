import {
  SWIPE_HIDDEN_WIDTH_DESKTOP,
  SWIPE_HIDDEN_WIDTH_MOBILE,
  SWIPE_THRESHOLD_PERCENTAGE,
} from '@/lib/constants/data/ui-config'
import { useMyMediaQuery } from '@/lib/utils/hooks/common/use-my-media-query'
import { useState } from 'react'
import { SwipeEventData, useSwipeable } from 'react-swipeable'

/**
 * @function useSwipeProps
 * @description A custom hook that encapsulates the logic related to swipe gestures for revealing hidden actions.
 * It manages the horizontal translation of a swipable element and tracks the swipe direction.
 * The hook adjusts the hidden area width based on whether the device is mobile or desktop.
 *
 * @returns  - An object containing:
 * - `rightHiddenWidth`: The calculated width of the right hidden area.
 * - `leftHiddenWidth`: The calculated width of the left hidden area.
 * - `translateX`: The current horizontal translation value of the swipable element.
 */
export function useSwipeProps() {
  const [translateX, setTranslateX] = useState(0) // State to control the horizontal translation of the swipable element.
  const [swipeState, setSwipeState] = useState<'none' | 'left' | 'right'>(
    'none', // State to track the current swipe direction ('none', 'left', 'right').
  )
  const { isMobile } = useMyMediaQuery() // Custom hook to determine if the device is mobile based on media queries.

  const hiddenWidth = isMobile
    ? SWIPE_HIDDEN_WIDTH_MOBILE
    : SWIPE_HIDDEN_WIDTH_DESKTOP
  const leftHiddenWidth = hiddenWidth // Width of the left hidden area, adjusted considering device width.
  const rightHiddenWidth = hiddenWidth // Width of the right hidden area, adjusted considering device width.

  // Handler for swipe left gestures.
  const onSwipedLeft = (eventData: SwipeEventData) => {
    if (swipeState === 'right') {
      setTranslateX(0) // If already swiped right, go back to the initial position.
      setSwipeState('none')
    } else if (
      Math.abs(eventData.deltaX) >
      leftHiddenWidth * SWIPE_THRESHOLD_PERCENTAGE
    ) {
      setTranslateX(-rightHiddenWidth) // If swiped left beyond the threshold, reveal the right hidden area.
      setSwipeState('left')
    } else {
      setTranslateX(0) // If the swipe was not far enough, go back to the initial position.
      setSwipeState('none')
    }
  }

  // Handler for swipe right gestures.
  const onSwipedRight = (eventData: SwipeEventData) => {
    if (swipeState === 'left') {
      setTranslateX(0) // If already swiped left, go back to the initial position.
      setSwipeState('none')
    } else if (
      Math.abs(eventData.deltaX) >
      leftHiddenWidth * SWIPE_THRESHOLD_PERCENTAGE
    ) {
      setTranslateX(leftHiddenWidth) // If swiped right beyond the threshold, reveal the left hidden area.
      setSwipeState('right')
    } else {
      setTranslateX(0) // If the swipe was not far enough, go back to the initial position.
      setSwipeState('none')
    }
  }

  // Handler for ongoing swipe gestures, updates the horizontal translation.
  const onSwiping = (eventData: SwipeEventData) => {
    setTranslateX(eventData.deltaX)
  }

  // Initialize swipe handlers using the useSwipeable hook.
  const swipeHandlers = useSwipeable({
    onSwipedLeft,
    onSwipedRight,
    onSwiping,
    delta: 20, // Minimum distance (in pixels) for a swipe to be recognized.
    trackMouse: true, // Whether to track mouse events for swipe gestures.
  })

  return {
    rightHiddenWidth, // The calculated width of the right hidden area.
    leftHiddenWidth, // The calculated width of the left hidden area.
    translateX, // The current horizontal translation value.
    swipeHandlers,
  }
}
