import { SendHorizontal } from "lucide-react"
import { ChatHandler, SuggestedQuestionsData } from ".."

export function SuggestedQuestions({
  questions,
  append,
  isLastMessage,
}: {
  questions: SuggestedQuestionsData
  append: Pick<ChatHandler, "append">["append"]
  isLastMessage: boolean
}) {
  const showQuestions = isLastMessage && questions.length > 0
  return (
    showQuestions &&
    append !== undefined && (
      <div className="flex flex-col gap-2">
        <div className="font-semibold flex items-center gap-1">
          <SendHorizontal size={16} /> Suggested questions:
        </div>
        <div className="flex flex-col space-y-2">
          {questions.map((question, index) => (
            <a
              key={index}
              onClick={() => {
                append({ role: "user", content: question })
              }}
              className="text-sm italic hover:underline cursor-pointer"
            >
              {"->"} {question}
            </a>
          ))}
        </div>
      </div>
    )
  )
}
