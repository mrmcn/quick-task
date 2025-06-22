import { useMyMediaQuery } from '@/lib/utils/hooks/common/use-my-media-query'
import { useState } from 'react'
import { SwipeEventData } from 'react-swipeable'

// A custom hook that encapsulates the logic related to swipe gestures for revealing hidden actions.
export function useSwipeProps() {
  const [translateX, setTranslateX] = useState(0) // State to control the horizontal translation of the swipable element.
  const [swipeState, setSwipeState] = useState<'none' | 'left' | 'right'>(
    'none', // State to track the current swipe direction ('none', 'left', 'right').
  )
  const { isMobile } = useMyMediaQuery() // Custom hook to determine if the device is mobile based on media queries.

  const leftHiddenWidth = isMobile ? 60 : 100 // Width of the left hidden area, adjusted for mobile.
  const rightHiddenWidth = isMobile ? 60 : 100 // Width of the right hidden area, adjusted for mobile.
  const SWIPE_THRESHOLD = 0.3 // Threshold (as a percentage of the hidden area width) to trigger a full swipe action.

  // Handler for swipe left gestures.
  const onSwipedLeft = (eventData: SwipeEventData) => {
    if (swipeState === 'right') {
      setTranslateX(0) // If already swiped right, go back to the initial position.
      setSwipeState('none')
    } else if (Math.abs(eventData.deltaX) > leftHiddenWidth * SWIPE_THRESHOLD) {
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
    } else if (Math.abs(eventData.deltaX) > leftHiddenWidth * SWIPE_THRESHOLD) {
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

  return {
    rightHiddenWidth, // The calculated width of the right hidden area.
    leftHiddenWidth, // The calculated width of the left hidden area.
    translateX, // The current horizontal translation value.
    onSwiping, // The swipe in progress event handler.
    onSwipedLeft, // The swipe left event handler.
    onSwipedRight, // The swipe right event handler.
    delta: 20, // The minimum distance (in pixels) for a swipe to be recognized.
    trackMouse: true, // Whether to track mouse events for swipe gestures.
  }
}
