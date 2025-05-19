import { useState } from 'react';

const useFileProcessor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));

    if (selectedFile.type.startsWith('video')) {
      compressVideo(selectedFile);
    }
  };

  const compressVideo = (file: File) => {
    setProcessing(true);

    const videoElement = document.createElement('video');
    videoElement.src = URL.createObjectURL(file);
    videoElement.load();

    videoElement.onloadedmetadata = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        setError('Failed to get canvas context.');
        setProcessing(false);
        return;
      }

      // تنظیمات برای ویدیو (تغییر ابعاد به 720p یا موارد دلخواه)
      canvas.width = 1280;
      canvas.height = 720;

      // ایجاد MediaRecorder برای ضبط ویدیو
      const stream = canvas.captureStream(30); // 30 FPS
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

      const chunks: Blob[] = [];
      recorder.ondataavailable = (event) => chunks.push(event.data);
      recorder.onstop = () => {
        const videoBlob = new Blob(chunks, { type: 'video/webm' });
        const previewUrl = URL.createObjectURL(videoBlob);
        setFilePreview(previewUrl); // نمایش ویدیو فشرده
        setProcessing(false);
        setUploadDialogOpen(true);
      };

      recorder.start();

      // کشیدن ویدیو به canvas به‌طور پیوسته
      const drawFrame = () => {
        if (videoElement.paused || videoElement.ended) {
          return;
        }

        // تغییر ابعاد ویدیو و رسم روی canvas
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(drawFrame);
      };

      videoElement.play();
      drawFrame();

      // توقف ضبط پس از مدت زمانی معین (مثلاً مدت ویدیو)
      setTimeout(() => {
        recorder.stop();
      }, file.size / 100); // با توجه به سایز فایل، مدت زمان ضبط را تنظیم می‌کنیم
    };
  };

  return {
    file,
    filePreview,
    uploadDialogOpen,
    error,
    processing,
    handleFileChange,
  };
};

export default useFileProcessor;
