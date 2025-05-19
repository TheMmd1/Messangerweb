import { axiosPrivate } from '@/components/axios';
import axios from 'axios';

// تابع ارسال درخواست برای اتصال به سوکت
export const Connection = async () => {
  // if (typeof window === 'undefined') return;
  const access_token = localStorage.getItem('access_token');
  console.log(access_token);
  if (access_token) {
    try {
      const response = await axiosPrivate.get('/api/v1/connection/join', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + access_token,
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data;
      } else {
        throw error;
      }
    }
  }
};
