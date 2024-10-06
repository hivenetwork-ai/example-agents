import Header from "@/components/header"
import ChatSection from "../components/chat-section"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-2 md:gap-10 pt-16 p-2 md:p-24 background-gradient bg-[#d36a1f29]">
      <Header />
      <ChatSection />
    </main>
  )
}
