import { useState } from 'react'

export function useVisibility() {
  const [isInputVisible, setIsInputVisible] = useState(false)
  const handleSearchIconClick = () => {
    setIsInputVisible(true)
  }
  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setIsInputVisible(false)
    }
  }
  return { isInputVisible, handleOnBlur, handleSearchIconClick }
}
