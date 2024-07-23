"use client";

import { AudioWaveform, File, FileImage, FolderArchive, UploadCloud, Video, X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "./input";
import { ScrollArea } from "./scroll-area";
import { cn } from "@/lib/utils/ui";

enum FileTypes {
  Image = "image",
  Pdf = "pdf",
  Audio = "audio",
  Video = "video",
  Other = "other",
}

const ImageColor = {
  bgColor: "bg-purple-600",
  fillColor: "fill-purple-600",
};

const PdfColor = {
  bgColor: "bg-blue-400",
  fillColor: "fill-blue-400",
};

const AudioColor = {
  bgColor: "bg-yellow-400",
  fillColor: "fill-yellow-400",
};

const VideoColor = {
  bgColor: "bg-green-400",
  fillColor: "fill-green-400",
};

const OtherColor = {
  bgColor: "bg-gray-400",
  fillColor: "fill-gray-400",
};

interface Props {
  multiple?: boolean;
  onChange?: (files: File[]) => void;
  accept?: string;
  defaultValue?: File[];
  className?: string
}

const Dropzone: React.FC<Props> = ({ className, multiple, accept, defaultValue, onChange }) => {
  const [files, setFiles] = useState<File[]>(defaultValue ?? []);

  const getFileIconAndColor = (file: File) => {
    if (!file) {
      return {
        icon: <FolderArchive size={40} className={OtherColor.fillColor} />,
        color: OtherColor.bgColor,
      };
    }
    if (file.type.includes(FileTypes.Image)) {
      return {
        icon: <FileImage size={40} className={ImageColor.fillColor} />,
        color: ImageColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Pdf)) {
      return {
        icon: <File size={40} className={PdfColor.fillColor} />,
        color: PdfColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Audio)) {
      return {
        icon: <AudioWaveform size={40} className={AudioColor.fillColor} />,
        color: AudioColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Video)) {
      return {
        icon: <Video size={40} className={VideoColor.fillColor} />,
        color: VideoColor.bgColor,
      };
    }

    return {
      icon: <FolderArchive size={40} className={OtherColor.fillColor} />,
      color: OtherColor.bgColor,
    };
  };

  const removeFile = (file: File) => {
    setFiles((prevUploadedFiles) => {
      onChange && onChange(prevUploadedFiles.filter((item) => item !== file));
      return prevUploadedFiles.filter((item) => item !== file);
    });
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const files = accept
        ? acceptedFiles.filter((file) => accept.split(",").includes(file.type))
        : acceptedFiles;
      if (files.length === 0) {
        return
      }
      if (multiple) {
        setFiles((c) => {
          onChange && onChange([...c, ...files]);
          return [...c, ...files];
        });
      } else {
        onChange && onChange([files[0]]);
        setFiles([files[0]]);
      }
    },
    [multiple, onChange, accept],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div>
        <label
          {...getRootProps()}
          className={cn("relative flex flex-col items-center justify-center w-full py-6 border-2 border-border border-dashed rounded-lg cursor-pointer transition-all bg-background hover:bg-card", className)}
        >
          <div className=" text-center">
            <div className="border border-border p-2 rounded-md max-w-min mx-auto">
              <UploadCloud size={20} />
            </div>

            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">Drag files</span>
            </p>
            <p className="text-xs text-gray-500">
              Click to upload files &#40;files should be under 10 MB &#41;
            </p>
          </div>
        </label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="image/*"
          type="file"
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div>
          <ScrollArea className="h-40">
            <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">Files to upload</p>
            <div className="space-y-2">
              {files.map((file) => {
                return (
                  <div
                    key={file?.lastModified}
                    className="flex justify-between gap-2 rounded-lg overflow-hidden border border-border group hover:pr-0"
                  >
                    <div className="flex items-center flex-1 p-2">
                      <div className="text-white">{getFileIconAndColor(file).icon}</div>

                      <div className="w-full ml-2 space-y-1">
                        <div className="text-sm flex justify-between">
                          <p className="text-muted-foreground ">{file?.name.slice(0, 25)}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        removeFile(file);
                      }}
                      className="bg-red-500 text-white opacity-0 transition-all items-center justify-center cursor-pointer px-2 group-hover:opacity-100"
                    >
                      <X size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
