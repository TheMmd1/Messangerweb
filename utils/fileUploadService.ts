import { useState, useCallback } from 'react';

export const useFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [fileAsBuffer, setFileAsBuffer] = useState<Buffer | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState<boolean>(false);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileType(selectedFile.type);
    setFileSize((selectedFile.size / 1024).toFixed(2));

    const reader = new FileReader();
    reader.onload = async () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const buffer = Buffer.from(arrayBuffer);
      setFileAsBuffer(buffer);
      const isMediaOrNo = selectedFile.type.startsWith('image') || selectedFile.type.startsWith('video');
      if (isMediaOrNo) setFilePreview(URL.createObjectURL(selectedFile));
      setUploadDialogOpen(true);
    };
    reader.readAsArrayBuffer(selectedFile);
    setFileAsBuffer(null);
  }, []);

  const setUploadDialogOpenCallback = useCallback((value: boolean) => setUploadDialogOpen(value), []);

  return {
    file,
    fileType,
    fileSize,
    fileAsBuffer,
    filePreview,
    uploadDialogOpen,
    handleFileChange,
    setUploadDialogOpen: setUploadDialogOpenCallback,
  };
};
