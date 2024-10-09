"use client"

import { useWeb3Modal } from "@web3modal/wagmi/react"
import { useAccount } from "wagmi"
import { Button } from "./button"
import { elipisAddress } from "@/utils"

export default function WalletConnectButton() {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()

  return (
    <div>
      <Button onClick={() => open()}>
        {address && isConnected ? elipisAddress(address) : "Connect Wallet"}
      </Button>
    </div>
  )
}
