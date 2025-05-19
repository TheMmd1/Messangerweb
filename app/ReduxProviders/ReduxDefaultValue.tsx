'use client';

import i18next from 'i18next';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Spinner from '@/components/SpinnerComp/Index';

export interface AuxProps {
  children: React.ReactNode;
  socket?: WebSocket;
}

const ReduxDefaultValue = ({ children }: AuxProps) => {
  // استیت ها و سایر بخش های مورد نیاز
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === 'otp-password' || pathname === 'profile'; // بررسی اینکه آیا در صفحه هوم هستیم یا نه

  useEffect(() => {
    // بررسی اینکه آیا طبان برنامه عوض شده یا نه
    if (isHome) {
      setLoading(false);
      return;
    }

    const localLang = localStorage.getItem('lang');

    setLoading(false);

    if (localLang) i18next.changeLanguage(localLang!);

    // اگر زبان عوض شد ری رندر کن
    i18next.on('languageChanged', (lng) => {
      localStorage.setItem('lang', lng);
    });

    return () => {
      i18next.off('languageChanged'); // پاک سازی بعد از اتمام کار
    };
  }, [isHome]);

  //چک میکنه اگر کاریر توکن داشت اون رو در صفحه اصلی نگه دار وگرنه ریدایرکت کن به صفحه لاگین
  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    if (access_token && refresh_token) return;
    else router.push('/');
  }, [router]);

  return loading && !isHome ? (
    <div className="flex h-screen items-center justify-center">
      <Spinner />
    </div>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
};

export default ReduxDefaultValue;
