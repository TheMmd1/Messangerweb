'use client';

import axios from 'axios';

// بیس یو آر ال برای کل پروژه
const BASE_URL = 'http://45.156.187.251:8001';

// درست کردن اینستنس عمومی برای درخواست‌های HTTP بدون نیاز به احراز هویت
export const axiosPublic = axios.create({
  baseURL: BASE_URL, // تنظیم آدرس پایه برای تمام درخواست‌ها
});

// درست کردن اینستنس خصوصی برای درخواست‌های نیازمند احراز هویت
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});

// اضافه کردن یک middleware به درخواست‌های axiosPrivate برای بررسی و اضافه کردن توکن
axiosPrivate.interceptors.request.use(
  async (config) => {
    // بررسی و گرفتن توکن از localStorage
    const access_token = typeof window !== 'undefined' && localStorage.getItem('access_token');
    if (access_token) {
      // اضافه کردن توکن به هدر Authorization
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config; // برگرداندن تنظیمات درخواست
  },
  (error) => {
    // در صورت بروز خطا، خطا را بازگردانید
    return Promise.reject(error);
  }
);

// اضافه کردن یک middleware به پاسخ‌های axiosPrivate برای بررسی وضعیت توکن
axiosPrivate.interceptors.response.use(
  (res) => {
    return res;
  },

  async (err) => {
    const originalConfig = err.config;
    // چک کردن اینکه درخواست به آدرس لاگین نباشد و خطای پاسخ دریافت شده باشد
    if (originalConfig.url !== '/admin/auth/signin' && err.response) {
      // اگر وضعیت پاسخ 403 باشد یعنی توکن منقضی شده است
      if (err.response.status === 403) {
        try {
          // اگر سرور سمت کلاینت نبود، عملیات را متوقف کن
          if (typeof window === 'undefined') return;
          // ارسال درخواست برای گرفتن توکن جدید
          const rs = await axiosPublic.post(`/api/v1/auth/renew_token`, {
            access_token: localStorage.getItem('access_token'),
            refresh_token: localStorage.getItem('refresh_token'),
          });

          const access = rs.data.data.access_token;
          const refresh = rs.data.data.refresh_token;

          // ذخیره توکن‌های جدید در localStorage
          localStorage.setItem('access_token', access);
          localStorage.setItem('refresh_token', refresh);

          // به‌روزرسانی هدر Authorization با توکن جدید
          originalConfig.headers.Authorization = `Bearer ${access}`;

          return axiosPrivate(originalConfig); // ارسال مجدد درخواست با تنظیمات جدید
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(err);
  }
);
