"use client"

import { useRef, useState } from "react"
import { ChatInput, ChatMessages } from "./ui/chat"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { useAppDispatch } from "@/store/hooks"
import { setTransformedMessages } from "@/features/chatSlice"
import { sendChatAPI } from "@/apis/chat"
import { toast } from "react-toastify"
import { uploadFileAPI } from "@/apis/fileupload"
import { useSharedRef } from "@/context/RefProvider"
import { Message } from "ai"

export default function ChatSection() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<any>({})

  const { transformedMessages } = useSelector((state: RootState) => state.chat)
  const dispatch = useAppDispatch()

  const inputRef = useSharedRef()

  const handleOnSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    ops?: {
      data?: any;
    }
  ) => {
    try {
      e.preventDefault();

      if (!ops?.data) return

      setFormData(ops.data)

      const formData = new FormData();

      formData.append('user_id', ops.data.userId);
      formData.append('session_id', ops.data.sessionId);
      formData.append('chat_data', JSON.stringify(ops.data.chatData));

      if (ops.data.files && ops.data.files.length > 0 ) {
        ops.data.files.forEach((file: File) => {
          formData.append("files", file)
        })
      }
  
      dispatch(
        setTransformedMessages([
          ...transformedMessages,
          ...ops.data.chatData.messages,
        ])
      )

      setIsLoading(true)
      const resChat = await sendChatAPI(formData)
      dispatch(
        setTransformedMessages([
          ...transformedMessages,
          ...ops.data.chatData.messages,
          {
            role: "system",
            content: resChat,
          },
        ])
      )
    } catch (error) {
      console.log(error)
      toast.warn("Error occured while sending chat.")
    } finally {
      setIsLoading(false)
    }
  }

  const reload = async () => {
    dispatch(setTransformedMessages(transformedMessages.slice(0, -1)))
    setIsLoading(true)
    const res = await sendChatAPI(formData)
    dispatch(
      setTransformedMessages([
        ...transformedMessages.slice(0, -1),
        {
          role: "system",
          content: res,
        },
      ])
    )
    setIsLoading(false)
  }

  const stop = async () => {}

  const append = async (
    message: Message | Omit<Message, "id">,
    ops?: { data: any }
  ): Promise<string | null | undefined> => {
    try {
      if (!message || !ops) {
        return Promise.resolve(undefined)
      }

      // const response = await sendChatAPI(message, ops)
      // const response = await sendChatAPI(message)

      // return response
    } catch (error) {
      console.error("Error in append function:", error)
      return Promise.resolve(null)
    }
  }

  const handleClickSuggestedQuestion = (question: string) => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = question
      inputRef.current.dispatchEvent(new Event("input"))
    }
  }

  return (
    <div className="space-y-2 md:space-y-4 max-w-5xl w-full flex-grow">
      {!transformedMessages.length ? (
        <div className="w-full rounded-xl bg-white p-2 md:p-4 shadow-xl pb-0">
          <div className="flex h-[50vh] flex-col items-center justify-center overflow-y-auto ">
            <div className="flex flex-col gap-2 md:gap-4">
              <span className="text-lg font-semibold">
                Suggested questions:
              </span>
              <div className="flex flex-col gap-2 md:gap-4">
                <p
                  className="w-fit hover:underline cursor-pointer"
                  onClick={() =>
                    handleClickSuggestedQuestion("What can you help me with?")
                  }
                >
                  • What can you help me with?
                </p>
                <p
                  className="w-fit hover:underline cursor-pointer"
                  onClick={() =>
                    handleClickSuggestedQuestion(
                      "What tools do you have access to?"
                    )
                  }
                >
                  • What tools do you have access to?
                </p>
                <p
                  className="w-fit hover:underline cursor-pointer"
                  onClick={() =>
                    handleClickSuggestedQuestion(
                      "What’s an example of your capabilities?"
                    )
                  }
                >
                  • What’s an example of your capabilities?
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ChatMessages
          messages={transformedMessages}
          isLoading={isLoading}
          reload={reload}
          stop={stop}
          append={append}
        />
      )}

      <ChatInput
        handleSubmit={handleOnSubmit}
        isLoading={isLoading}
      />
    </div>
  )
}
