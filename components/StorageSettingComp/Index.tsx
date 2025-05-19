'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import { useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { useDispatch } from 'react-redux';
import BackButton from '../BackButton/BackButton';
import { handleBack } from '@/store/slices/ChangeSilde';
import { useTranslation } from 'react-i18next';

export default function Index() {
  // اضافه کردن state ها و سایر tools ها
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // اضافه کردن دیتا های فیک
  const data = [
    { title: t('musics'), value: 15, color: '#ffcc00' },
    { title: t('videos_photos'), value: 25, color: '#C13C37' },
    { title: t('files'), value: 20, color: '#001c8c' },
    { title: t('other'), value: 40, color: '#c400bb' },
  ];

  // تابع گرفتن index برای متمایز کردن هر بخش هنگام کلیک
  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-center">
      <header className="flex h-[8dvh] w-full items-center justify-end">
        <nav
          className={`flex w-full items-center justify-between px-5 ${t('system_lang') === 'fa' ? 'ltr-custome' : 'rtl-custome'}`}
        >
          <BackButton />
          <p className="font-IranYekanBold text-[2dvh] text-white">{t('storage and the internet')}</p>
          <span className="w-[35px]"></span>
        </nav>
      </header>
      <section className="box-shadow relative flex h-[calc(100dvh-8dvh)] w-full items-start justify-center rounded-t-[30px] bg-MainBgOne pt-4">
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-5 p-4">
          <PieChart
            className="mt-10 h-[70vw] w-[70vw] cursor-pointer sm:h-[50vw] sm:w-[50vw] lg:h-[20vw] lg:w-[20vw]"
            data={data}
            radius={42}
            lineWidth={60}
            label={({ dataEntry }) => `${dataEntry.value}%`}
            labelStyle={{
              fontSize: '5px',
              fill: '#fff',
            }}
            segmentsShift={1}
            labelPosition={70}
            animate
            onClick={(_, index) => handleClick(index)}
          />

          <div className="w-full divide-y-2 rounded-[10px] border p-5 shadow-lg">
            {data.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className={`flex cursor-pointer items-center justify-between rounded px-4 py-3 transition-all duration-300 ${selectedIndex === index ? 'bg-gray-200' : ''}`}
              >
                <div className="flex items-center gap-2">
                  <div style={{ backgroundColor: `${item.color}` }} className="h-5 w-5 rounded-full"></div>
                  <p className='text-[1.7dvh] md:text-[2dvh]:'>{item.title}</p>
                </div>
                <p className='text-[1.5dvh] md:text-[1.8dvh]'>{item.value}%</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div>
        <button
          onClick={() => dispatch(handleBack())}
          className="absolute bottom-3 right-5 rounded-[10px] bg-MainBgThree px-7 py-3 text-[18px] text-MainBgOne shadow-[0_1px_5px_#000050]"
        >
          {t('confirm')}
        </button>
      </div>
    </div>
  );
}
