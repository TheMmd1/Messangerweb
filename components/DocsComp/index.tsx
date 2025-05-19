'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import ImageComp from './ImageComp';
import DocComp from './DocComp';
import LinkComp from './LinkComp';
import { useState } from 'react';
import BackButton from '../BackButton/BackButton';
import { useTranslation } from 'react-i18next';

const Index = () => {
  // اضافه کردن state ها و سایر tools ها
  const { t } = useTranslation();
  const [tab, setTab] = useState<number>(1);

  return (
    <div className="flex h-[100dvh] w-full flex-col items-start justify-center">
      {/* هدر */}
      <header className="flex h-[7.5dvh] w-full items-center justify-end">
        <nav className={`flex w-full items-center justify-between px-5 ${localStorage.getItem('lang') === 'fa' ? 'ltr-custome' : 'rtl-custome'}`}>
          <BackButton />
          <p className="font-IranYekanBold text-[16px] text-white"></p>
          <div className="w-[5rem]"></div>
        </nav>
      </header>
      {/* تب ها */}
      <div className="flex h-[4.1dvh] w-full flex-row-reverse items-center justify-around">
        <div
          onClick={() => setTab(1)}
          className={`flex w-24 cursor-pointer items-center justify-center pb-3 text-white transition-all duration-300 ${
            tab === 1 ? 'border-b-4 border-white opacity-100' : 'border-b-4 border-[#38A271] opacity-50'
          }`}
        >
          <p className="font-IranYekanDemiBold text-[14px]">{t('image_and_Video')}</p>
        </div>
        <div
          onClick={() => setTab(2)}
          className={`flex w-24 cursor-pointer items-center justify-center pb-3 text-white transition-all duration-300 ${
            tab === 2 ? 'border-b-4 border-white opacity-100' : 'border-b-4 border-[#38A271] opacity-50'
          }`}
        >
          <p className="font-IranYekanDemiBold text-[14px]">{t('documents')}</p>
        </div>
        <div
          onClick={() => setTab(3)}
          className={`flex w-24 cursor-pointer items-center justify-center pb-3 text-white transition-all duration-300 ${
            tab === 3 ? 'border-b-4 border-white opacity-100' : 'border-b-4 border-[#38A271] opacity-50'
          }`}
        >
          <p className="font-IranYekanDemiBold text-[14px]">{t('links')}</p>
        </div>
      </div>
      <div className="box-shadow max-h-[calc(100dvh-11dvh)] w-full items-start justify-center rounded-t-[30px] bg-MainBgTwo pt-3">
        {tab === 1 ? <ImageComp /> : tab === 2 ? <DocComp /> : tab === 3 && <LinkComp />}
      </div>
    </div>
  );
};

export default Index;
