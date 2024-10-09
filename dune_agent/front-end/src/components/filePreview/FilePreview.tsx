import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { File, XCircleIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { cn } from "../ui/lib/utils";

export default function FilePreview({
  file,
  onRemove,
}: {
  file: File | undefined;
  onRemove: () => void;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleUploadImageFile = async (file: File) => {
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
      setImageUrl(base64);
    } catch (error) {
      console.error(`File load error occurred`, error);
    }
  };

  const init = useCallback(async () => {
    if (file?.type.startsWith("image/")) {
      return await handleUploadImageFile(file);
    }
  }, [file]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div className="group relative flex w-fit items-center rounded-lg border border-borderColor">
      {file?.type.startsWith("image/") ? (
        !imageUrl ? (
          <div className="flex h-20 w-20">
            <Skeleton
              width={80}
              height={80}
              className="rounded-lg leading-[80px]"
            />
          </div>
        ) : (
          <div className="relative h-20 w-20">
            <Image
              src={imageUrl || ""}
              alt="Uploaded image"
              fill
              className="h-full w-full rounded-xl object-cover p-1 hover:brightness-75"
            />
          </div>
        )
      ) : (
        <div className="flex w-fit items-center gap-1">
          <div className="relative flex h-20 items-center text-[80px]">
            <File className="h-[60px] w-[60px] group-hover:brightness-75" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="w-[120px] truncate">{file?.name}</p>
            <p className="text-xs first-letter:uppercase">
              {file?.type} File
            </p>
          </div>
        </div>
      )}

      <div
        className={cn(
          "absolute -top-2 -right-2 w-6 h-6 z-10 bg-gray-500 text-white rounded-full hidden group-hover:block cursor-pointer"
        )}
      >
        <XCircleIcon
          className="w-6 h-6 bg-gray-500 text-white rounded-full"
          onClick={onRemove}
        />
      </div>
    </div>
  );
}
