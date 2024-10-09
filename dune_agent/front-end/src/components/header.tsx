import Image from "next/image"
import WalletConnectButton from "@/components/ui/wallet-connect-button"
import Link from "next/link"

export default function Header() {
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <div className="fixed top-0 left-0 flex h-[60px] md:h-20 w-full items-center justify-center bg-gradient-to-b from-white via-white lg:static lg:h-auto lg:w-auto lg:bg-none">
        <Link
          href="https://swarmzero.ai/"
          target="_blank"
          className="flex items-center justify-center font-nunito text-lg font-bold gap-2"
        >
          <Image
            className="rounded-xl"
            src="/swarmzero_mark.png"
            alt="SwarmZero Logo"
            width={242}
            height={48}
            priority
          />
        </Link>
      </div>
      <WalletConnectButton />
    </div>
  )
}
