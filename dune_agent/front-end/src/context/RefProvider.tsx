import React, { createContext, useRef, useContext, RefObject } from "react"

const RefContext = createContext<RefObject<HTMLTextAreaElement> | null>(null)

export const useSharedRef = () => useContext(RefContext)

const RefProvider = ({ children }: { children: React.ReactNode }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  return (
    <RefContext.Provider value={textareaRef}>{children}</RefContext.Provider>
  )
}

export default RefProvider
