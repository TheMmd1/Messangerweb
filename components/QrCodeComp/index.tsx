'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { handleBack } from '@/store/slices/ChangeSilde';

const Index = () => {
  // اضافه کردن state ها و سایر tools ها
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // برای اضافه کردن ارسال لینک فعلا به صورت فیک
  const ShareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'اشتراک‌گذاری لینک',
          text: 'این لینک را مشاهده کنید!',
          url: window.location.href,
        });
      } catch (error) {
        console.error('خطا در اشتراک‌گذاری:', error);
      }
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-start justify-center">
      <header className="flex h-[8dvh] w-full items-center justify-end">
        <nav
          className={`flex w-full items-center justify-between px-5 ${t('system_lang') === 'fa' ? 'ltr-custome' : 'rtl-custome'}`}
        >
          <div
            onClick={() => dispatch(handleBack())}
            className={`flex w-[5rem] items-center ${t('system_lang') === 'en' ? 'rotateYMenu justify-end' : 'justify-start'}`}
          >
            <Image
              width={35}
              height={35}
              className="h-[2.5dvh] w-[2.5dvh] cursor-pointer object-contain"
              src={'/svg/Setting/arrowLeft.svg'}
              alt="icon image"
            />
          </div>
          <p className="font-IranYekanBold text-[2dvh] text-white">{t('QR_code')}</p>
          <div onClick={ShareLink} className="flex w-[5rem] items-center justify-end gap-x-2">
            <Image
              width={35}
              height={35}
              className="h-[2.5dvh] w-[2.5dvh] cursor-pointer object-contain"
              src={'/svg/QrCode/ShareIcon.svg'}
              alt="icon image"
            />
          </div>
        </nav>
      </header>
      <div className="box-shadow flex min-h-[calc(100dvh-8dvh)] w-full items-start justify-center rounded-t-[30px] bg-MainBgOne">
        <div className="flex max-h-full min-h-full w-full flex-col items-center justify-start">
          <div className="relative mt-[12dvh] w-[90%] rounded-2xl bg-[#dedfdf] p-7">
            <div className="absolute -top-[4rem] right-[50%] flex h-[9rem] w-[9rem] translate-x-[50%] items-center justify-center rounded-full bg-MainBgOne lg:-top-[5rem] lg:h-[12rem] lg:w-[12rem]">
              <Image
                width={155}
                height={155}
                className="h-[85%] w-[85%] rounded-full object-cover object-top"
                src={'/svg/default_profile/user-profile.svg'}
                alt="icon image"
              />
            </div>
            <div className="mt-[10dvh] flex flex-col items-center justify-center gap-y-2 lg:mt-[13dvh]">
              <p className="font-IranYekanBold text-center text-[2.2dvh]">بیژن شمشیری</p>
              <p className="font-IranYekanDemiBold text-center text-[1.7dvh] text-MainTextTwo">در دسترس</p>
            </div>
            <div className="mt-5 flex w-full items-center justify-center">
              <QRCodeSVG bgColor="#dedfdf" className="h-[20dvh] w-[20dvh]" value="https://reactjs.org/" />
            </div>
          </div>
          <div className="mt-5 flex w-full items-center justify-center">
            <p className="font-IranYekanDimiBold w-[70%] text-center text-[2dvh] leading-8 text-MainTextTwo">
              {t('qrCode_desc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
