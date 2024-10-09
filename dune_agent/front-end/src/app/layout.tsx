import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NextFont } from "next/dist/compiled/@next/font"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import React from "react"

import { Web3ModalProvider } from "../context/Web3ModalProvider"

const inter: NextFont = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SwarmZero Network - Agent UI",
  description: "UI for SwarmZero Agents",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3ModalProvider>{children}</Web3ModalProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
