"use client";

import {
    FileUploader,
    FileInput,
    FileUploaderContent,
    FileUploaderItem,
} from "@/components/extension/file-uploader";
import { useState } from "react";
import { DropzoneOptions } from "react-dropzone";

export const FileUploadDropzone = () => {
    const [files, setFiles] = useState<File[] | null>([]);

    const dropzone = {
        accept: {
            "image/*": [".jpg", ".jpeg", ".png"],
        },
        multiple: false,
        maxFiles: 1,
        maxSize: 40 * 1024 * 1024,
    } satisfies DropzoneOptions;

    return (
        <FileUploader
            value={files}
            onValueChange={setFiles}
            dropzoneOptions={dropzone}
        >
            {!files || files.length === 0 ? (
                <FileInput>
                    <div className="flex items-center  justify-center h-32 w-[50%] border bg-background rounded-md mt-2 ">
                        <p className="text-gray-400 p-2">Arraste ou solte a imagem</p>
                    </div>
                </FileInput>
            ) : null}
            <FileUploaderContent className="flex items-center flex-row gap-2 mt-1">

                {files?.map((file, i) => (
                    <FileUploaderItem
                        key={i}
                        index={i}
                        className="p-0 w-[50%] h-[50%] rounded-md overflow-hidden"
                        aria-roledescription={`file ${i + 1} containing ${file.name}`}
                    >
                        <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="object-cover w-full h-full rounded-md"
                        />
                    </FileUploaderItem>
                ))}
            </FileUploaderContent>
        </FileUploader>
    );
};
