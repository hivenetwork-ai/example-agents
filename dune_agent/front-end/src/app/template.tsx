"use client"

import RefProvider from "@/context/RefProvider"
import StoreProvider from "@/context/StoreProvider"
import { PropsWithChildren } from "react"

export default function RootTemplate({ children }: PropsWithChildren) {
  return (
    <StoreProvider>
      <RefProvider>{children}</RefProvider>
    </StoreProvider>
  )
}
