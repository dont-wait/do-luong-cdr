import { useState, useRef, ChangeEvent, DragEvent } from "react";

interface FileUploadProps {
  files: File | undefined;
  setFiles: (file: File | undefined) => void;
}

const FileUpload = ({ files, setFiles }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files?.[0];
    setFiles(newFiles);
    setErrorMessage("");
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragging) setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files?.[0];
    if (droppedFiles && droppedFiles !== files) {
      setFiles(droppedFiles);
      setErrorMessage("");
    }
  };

  return (
    <div className='mx-auto p-4 w-full'>
      <div
        style={{ height: "400px" }}
        className={`border-2 border-dashed rounded-lg p-6 mb-4 transition-colors duration-200 flex justify-center align-middle
                    ${
                      isDragging
                        ? "border-primary bg-primary/10"
                        : "border-gray-300 dark:border-gray-700"
                    } 
                    ${errorMessage ? "border-red-500" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        <div className='text-center w-full flex flex-col justify-center align-middle'>
          <svg
            className='w-12 h-12 mx-auto text-gray-400 dark:text-gray-600'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'></path>
          </svg>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
            {isDragging ? "Drop files here" : "Drag & drop files here, or"}
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className='mt-2 text-primary hover:text-primary/80 font-medium text-base'
            type='button'>
            Browse Files
          </button>
          <p className='mt-1 text-xs text-gray-500 dark:text-gray-500'>
            Supported: XLSX, XLS
          </p>
          <input
            ref={fileInputRef}
            type='file'
            className='hidden'
            onChange={handleFileChange}
            accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
          />
        </div>
      </div>

      {errorMessage && (
        <div className='mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm'>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
