import { axiosPrivate, axiosPublic } from '@/components/axios';
import axios from 'axios';

// تابع درخواست ورود کاربر
export const signIn = async (userData: string) => {
  try {
    const response = await axiosPublic.post(
      '/api/v1/auth/signin',
      {
        value: userData,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response?.data;
    else throw error;
  }
};

// تابع درخواست ثبت نام کاربر
export const signUp = async (userData: string) => {
  const access_token = localStorage.getItem('access_token');
  try {
    const response = await axiosPrivate.post(
      '/api/v1/auth/signup',
      {
        value: userData,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + access_token,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response?.data;
    else throw error;
  }
};

// تابع بررسی برای ورود کاربر
export const signinVerify = async (userData: string) => {
  try {
    const res = await axiosPublic.post(
      '/api/v1/auth/verify',
      {
        code: userData,
        verification_method: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const ACCESS_TOKEN = res.data.data.access_token;
    const REFRESH_TOKEN = res.data.data.refresh_token;
    const EXPIRATION = res.data.data.exp;

    localStorage.setItem('access_token', ACCESS_TOKEN);
    localStorage.setItem('refresh_token', REFRESH_TOKEN);
    localStorage.setItem('token_exp', EXPIRATION);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response?.data;
    else throw error;
  }
};

// تابع بررسی و احراز اکانت کاربر
export const accountVerify = async (userData: string) => {
  try {
    const res = await axiosPublic.post(
      '/api/v1/auth/verify',
      {
        code: userData,
        verification_method: 0,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const ACCESS_TOKEN = res.data.data.access_token;
    const REFRESH_TOKEN = res.data.data.refresh_token;
    const EXPIRATION = res.data.data.exp;

    localStorage.setItem('access_token', ACCESS_TOKEN);
    localStorage.setItem('refresh_token', REFRESH_TOKEN);
    localStorage.setItem('token_exp', EXPIRATION);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error.response?.data;
    else throw error;
  }
};
