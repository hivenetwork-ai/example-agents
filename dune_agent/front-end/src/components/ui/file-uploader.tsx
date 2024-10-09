"use client"

import { Loader2, Paperclip } from "lucide-react"
import { ChangeEvent, useState } from "react"
import { buttonVariants } from "./button"
import { cn } from "./lib/utils"

export interface FileUploaderProps {
  config?: {
    inputId?: string
    fileSizeLimit?: number
    allowedExtensions?: string[]
    checkExtension?: (extension: string) => string | null
    disabled?: boolean
  }
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void
  onFileError?: (errMsg: string) => void
}

const DEFAULT_INPUT_ID = "fileInput"

export default function FileUploader({
  config,
  handleFileChange,
  onFileError,
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false)

  const inputId = config?.inputId || DEFAULT_INPUT_ID
  const allowedExtensions = config?.allowedExtensions

  return (
    <div className="self-stretch">
      <input
        type="file"
        id={inputId}
        style={{ display: "none" }}
        onChange={(e) => handleFileChange(e)}
        accept={allowedExtensions?.join(",")}
        disabled={config?.disabled || uploading}
        multiple
      />
      <label
        htmlFor={inputId}
        className={cn(
          buttonVariants({ variant: "secondary", size: "icon" }),
          "cursor-pointer",
          uploading && "opacity-50"
        )}
      >
        {uploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Paperclip className="-rotate-45 w-4 h-4" />
        )}
      </label>
    </div>
  )
}
