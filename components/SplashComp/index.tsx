'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { changeTheme } from '@/utils/themeHelper';

const Index = () => {
  // نشان دادن splash page برای اول برنامه
  useEffect(() => {
    changeTheme(Cookies.get('theme') ? Cookies.get('theme') : 'light');
    setTimeout(() => {
      Cookies.set('splash', 'true');
    }, 4500);
  }, []);

  return (
    <div
      className={`${Cookies.get('splash') ? 'hidden' : 'fade-out'} absolute z-[999] h-[100dvh] w-[100dvw] bg-MainBgThree`}
    >
      <div className="h-full w-full">
        <Image
          className="absolute bottom-0 left-0 right-0 top-0 -z-40 h-full w-full object-cover"
          src={'/svg/splash/splash-page-img.svg'}
          width={1200}
          height={1200}
          alt="splash screen"
        />
        <div className="absolute bottom-0 left-0 right-0 top-0 -z-50 bg-[#41b17d]"></div>
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-5">
          <Image
            className="mb-6 h-[160px] w-[200px] object-cover"
            src={'/svg/splash/splashIcon.svg'}
            width={200}
            height={200}
            alt="splash screen"
          />
          <p className="font-YekanBakhFaNum text-[34px] text-white">اپلیکیشن چت</p>
          <p className="text-[34px] text-white">CHAT APP</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
