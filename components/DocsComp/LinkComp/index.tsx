'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import { linkDoc } from '@/lib/data/linkDoc';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

// بخش اضافه کردن تایپ ها
interface LinkDataType {
  date: string;
  LinkName: string;
  link: string;
  title: string;
}

const Index = () => {
  // اضافه کردن state ها و سایر tools ها
  const { t } = useTranslation();

  return (
    <div className="your-component-scrollbar rtl-custome flex h-[100dvh] w-full flex-col items-center justify-start pb-32">
      {linkDoc.map((item: LinkDataType, index: number) => {
        return (
          <div
            key={index}
            className={`mt-8 flex w-full flex-col items-center justify-center gap-y-3 px-7 ${
              index + 1 === linkDoc.length && 'pb-12'
            }`}
          >
            <p className="font-IranYekanDemiBold flex w-full items-center justify-start text-[15px]">
              {item?.date}
            </p>
            <div className="flex w-full flex-col items-start justify-center gap-3 rounded-xl bg-MainBgOne p-3">
              <div className="flex items-center justify-center gap-x-3">
                <Image
                  className="h-[30px] w-[30px]"
                  width={30}
                  height={30}
                  src={'/svg/docs_chat/link_icon.svg'}
                  alt="file icon"
                />
                <div className="flex flex-col items-start gap-y-[6px]">
                  <p className="font-IranYekanMedium">{item?.title}</p>
                  <Link
                    target="_blank"
                    href={item?.link}
                    className="font-IranYekanBold cursor-pointer text-[15px] text-[#A0BEB0]"
                  >
                    {item?.LinkName}
                  </Link>
                </div>
              </div>
              <div className="flex w-full cursor-pointer items-center justify-between rounded-full bg-MainBgTwo px-4 py-3">
                <p className="font-IranYekanDemiBold text-[14px] text-MainTextTwo">{t('view_message')}</p>
                <Image
                  width={6}
                  height={10}
                  className="h-[10px] w-[6px] object-contain"
                  src={'/svg/setting/arrowLeftLittle.svg'}
                  alt="icon image"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Index;
