import { ChangeEvent, useEffect, useRef, useState } from "react"
import { Button } from "../button"
import FileUploader from "../file-uploader"
import UploadImagePreview from "../upload-image-preview"
import { ChatHandler } from "./chat.interface"
import { toast } from "react-toastify"
import { Textarea } from "../textarea"
import { useSharedRef } from "@/context/RefProvider"
import FilePreview from "@/components/filePreview/FilePreview"

const DEFAULT_FILE_SIZE_LIMIT = 1024 * 1024 * 5
const allowedExtensions = [
  "image/*",
  "application/*",
  "text/*",
]

export default function ChatInput(
  props: Pick<ChatHandler, "handleSubmit" | "isLoading">
) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [input, setInput] = useState<string>("")

  const inputRef = useSharedRef()
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let data: any = {}

    if (input === "") {
      toast.warn("Please type a message!")
      return
    }

    if (selectedFiles.length > 0) {
      data.files = selectedFiles
      // selectedFiles.forEach((file) => {
      //   formData.append("files", file)
      // })
    }

    const chatData: any = {
      messages: [
        {
          role: "user",
          content: input,
        },
      ]
    }

    data.userId = "user123"
    data.sessionId = "session123"
    data.chatData = chatData

    props.handleSubmit(e, { data });
    setInput("")
    setSelectedFiles([])
  }

  const onRemovePreviewFile = (index: number) => {
    setSelectedFiles((prevFiles) => {
      prevFiles.splice(index, 1)
      return [...prevFiles]
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleButtonClick = () => {
    if (input.trim() === "") {
      toast.warn("Please type a message!");
      return;
    }

    formRef.current?.requestSubmit();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      formRef.current?.requestSubmit();
    } else if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault()
      setInput((input) => input + "\n")
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])

    // Filter out files
    const validFiles = files.filter((file) => {
      console.log("filefile", file)
      // Check if the file type matches any of the allowed extensions
      const isAllowed = allowedExtensions.some((ext) => {
        // Allow exact matches (e.g., "application/pdf")
        if (ext === file.type) return true;
        
        // Allow wildcard matches (e.g., "image/*" matches "image/png" or "image/jpeg")
        if (ext.endsWith("/*")) {
          const baseType = ext.split("/")[0];
          return file.type.startsWith(baseType + "/");
        }
    
        return false;
      });
    
      if (!isAllowed) {
        toast.warn(`${file.name} is not a valid file and will be removed.`);
        return false;
      }
    
      if (file.size > DEFAULT_FILE_SIZE_LIMIT) {
        toast.warn(`${file.name} exceeds the 5MB size limit and will be removed.`);
        return false;
      }
    
      return true;
    });

    setSelectedFiles((prevs) => [...prevs, ...validFiles])
  }

  const fileConfig = {
    allowedExtensions,
  }

  useEffect(() => {
    if (inputRef?.current) {
      const refElement = inputRef.current

      const updateStateFromRef = () => {
        setInput(refElement.value)
      }

      refElement.addEventListener("input", updateStateFromRef)

      return () => {
        refElement.removeEventListener("input", updateStateFromRef)
      }
    }
  }, [inputRef])

  useEffect(() => {
    if (inputRef && inputRef.current) {
      const refElement = inputRef.current

      const syncStateWithRef = () => {
        setInput(refElement.value)
      }

      refElement.addEventListener("input", syncStateWithRef)

      return () => {
        refElement.removeEventListener("input", syncStateWithRef)
      }
    }
  }, [inputRef])

  return (
    <form className="flex flex-col rounded-xl bg-white p-2 md:p-4 shadow-xl" ref={formRef} onSubmit={onSubmit}>
      <div className="flex items-center gap-2 overflow-x-auto pt-[7px]">
        {selectedFiles.length > 0 &&
          selectedFiles.map((file: File, index: number) => (
            <FilePreview
              file={file}
              key={`file-${index}`}
              onRemove={() => onRemovePreviewFile(index)}
            />
          ))}
      </div>
      <div
        className={`flex flex-col md:flex-row w-full items-start justify-between gap-2 md:gap-4 ${
          selectedFiles.length > 0 && "mt-1"
        }`}
      >
        <Textarea
          autoFocus
          name="message"
          placeholder="Type a message"
          className="flex-1"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          ref={inputRef}
        />
        <div className="flex items-center gap-2">
          <FileUploader
            config={fileConfig}
            handleFileChange={handleFileChange}
          />
          <Button disabled={props.isLoading} onClick={handleButtonClick}>
            Send message
          </Button>
        </div>
      </div>
    </form>
  )
}
