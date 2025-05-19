'use client'; // Enable client-side rendering

import { handleSubmitUpload } from '@/Services/grpcApi';
import axios from 'axios';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface DetailType {
  message: string;
  ticketId: string;
  fileId: string;
  downloadUrl?: string; // جدید: اضافه کردن URL دانلود
}

export default function CreateTicketForm() {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [detail, setDetail] = useState<DetailType>();
  const [fileId, setFileId] = useState('');
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  console.log(error);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
  };

  const handleUploadFunc = async () => {
    const res = await handleSubmitUpload(file!);
    setDetail(res);
    setFileId(res.fileId);
    console.log(res);
  };

  useEffect(() => {
    if (detail?.ticketId) {
      const interval = setInterval(async () => {
        try {
          const response = await axios.get(`/api/upload?ticketId=${detail.ticketId}`);
          const data = response.data;
          if (data.progress !== undefined) {
            setProgress(data.progress);

            if (data.progress === 100) {
              clearInterval(interval);
            }
          } else {
            console.error('Failed to fetch progress.');
          }
        } catch (error) {
          console.error('Error fetching progress:', error);
          clearInterval(interval);
        }
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [detail?.ticketId]);

  console.log(downloadUrl);

  const handleDownload = async () => {
    if (!fileId) {
      setError('File ID is required!');
      return;
    }

    setError('');
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('fileId', fileId);

      // ارسال درخواست برای دریافت فایل
      const response = await axios.post('/api/download', formData, { responseType: 'blob' });

      // تبدیل داده به URL قابل دسترسی
      const url = URL.createObjectURL(response.data);

      // نمایش لینک دانلود در UI
      setDownloadUrl(url); // فرض بر اینکه یک state به نام downloadUrl دارید
      console.log('File ready for download');
    } catch (error) {
      console.error('Download error:', error);
      setError('Failed to download the file.');
    } finally {
      setProgress(0);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <h1>Upload File</h1>
        <div className="mb-10">
          <input type="file" onChange={(e) => handleFileChange(e)} />
          <button className="border" onClick={handleUploadFunc} type="submit">
            Upload
          </button>
        </div>
        {/* نمایش درصد پیشرفت */}
        <CircularProgressbar
          strokeWidth={10}
          styles={buildStyles({
            strokeLinecap: 'butt',
            textSize: '16px',
            pathColor: `rgba(56, 162, 113, ${progress / 100})`,
            textColor: '#38a271',
            trailColor: '#d6d6d6',
          })}
          value={progress}
          text={`${progress}%`}
          className="!w-[100px]"
        />
        {/* نمایش URL فایل دانلود شده */}
        {detail?.downloadUrl && (
          <div className="mt-4">
            <a href={detail.downloadUrl} target="_blank" rel="noopener noreferrer">
              <button className="rounded bg-blue-500 px-4 py-2 text-white">Download File</button>
            </a>
          </div>
        )}
      </div>
      <div className="flex h-screen w-1/2 items-center justify-center">
        <button onClick={handleDownload} className="h-20 w-20 cursor-pointer bg-gray-500">
          برای دانلود کلیک کنید
        </button>
      </div>
      <div className="flex h-screen items-center justify-center">
        {downloadUrl && <Image src={`${downloadUrl}`} alt="" width={500} height={500} />}
        {/* {downloadUrl && <video controls src={`${downloadUrl}`} width={500} height={500} />} */}
        <div></div>
      </div>
    </div>
  );
}
