import { defaultWagmiConfig } from "@web3modal/wagmi"
import { cookieStorage, createStorage } from "wagmi"
import { mainnet } from "wagmi/chains"

export const projectId = process.env
  .NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
}

export const chains = [mainnet] as const

export const config = defaultWagmiConfig({
  chains,
  projectId: projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
})
