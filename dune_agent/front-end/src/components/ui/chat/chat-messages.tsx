import { Loader2 } from "lucide-react"
import { useEffect, useRef } from "react"

import ChatActions from "./chat-actions"
import ChatMessage from "./chat-message"
import { ChatHandler } from "./chat.interface"

export default function ChatMessages(
  props: Pick<
    ChatHandler,
    "messages" | "isLoading" | "reload" | "stop" | "append"
  >
) {
  const scrollableChatContainerRef = useRef<HTMLDivElement>(null)
  const messageLength = props.messages.length
  const lastMessage = props.messages[messageLength - 1]

  const scrollToBottom = () => {
    if (scrollableChatContainerRef.current) {
      scrollableChatContainerRef.current.scrollTop =
        scrollableChatContainerRef.current.scrollHeight
    }
  }

  const isLastMessageFromAssistant =
    messageLength > 0 && lastMessage?.role !== "user"
  const showReload =
    props.reload && !props.isLoading && isLastMessageFromAssistant
  const showStop = props.stop && props.isLoading

  // `isPending` indicate
  // that stream response is not yet received from the server,
  // so we show a loading indicator to give a better UX.
  const isPending = props.isLoading && !isLastMessageFromAssistant

  useEffect(() => {
    scrollToBottom()
  }, [messageLength, lastMessage])

  return (
    <div className="w-full rounded-xl bg-white p-2 md:p-4 shadow-xl pb-0">
      <div
        className="flex h-[50vh] flex-col gap-2 md:gap-5 divide-y overflow-y-auto pb-2 md:pb-4"
        ref={scrollableChatContainerRef}
      >
        {props.messages.map((m, i) => {
          const isLoadingMessage = i === messageLength - 1 && props.isLoading
          return (
            <ChatMessage
              key={`chat-message-${i}`}
              chatMessage={m}
              isLoading={isLoadingMessage}
              append={props.append!}
              isLastMessage={i === messageLength - 1}
            />
          )
        })}
        {isPending && (
          <div className="flex justify-center items-center pt-10">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
      </div>
      {(showReload || showStop) && (
        <div className="flex justify-end py-1 md:py-4">
          <ChatActions
            reload={props.reload}
            showReload={showReload}
            showStop={showStop}
          />
        </div>
      )}
    </div>
  )
}
