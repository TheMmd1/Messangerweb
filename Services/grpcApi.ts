import axios from 'axios';

export const handleSubmitUpload = async (file: File) => {
  if (!file) return;
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post('/api/upload', formData);
    return response.data;
  } catch {
    console.error('Error uploading file');
  }
};

export const handleGetUploadProgress = async (ticketId: string) => {
  try {
    const response = await axios.get(`/api/upload?ticketId=${ticketId}`);
    const data = response.data;
    return data;
  } catch {
    console.log('Error fetching progress');
  }
};

export const handleSubmitDownload = async (fileId: string) => {
  const formData = new FormData();
  formData.append('fileId', fileId);

  const response = await axios.post('/api/download', formData, { responseType: 'blob' });

  return response;
};
