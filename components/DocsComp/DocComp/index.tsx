'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import { docChat } from '@/lib/data/docChat';
import Image from 'next/image';

// بخش اضافه کردن تایپ ها
interface DocDataType {
  stringDate: string;
  date: string;
  fileType: string;
  fileName: string;
  size: string;
}

const Index = () => {
  // تابع هندل کردن دانلود فایل
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/file/testFile.txt';
    link.download = 'test.txt';
    link.click();
  };

  return (
    <div className="your-component-scrollbar rtl-custome flex h-[100dvh] w-full flex-col items-center justify-start pb-32">
      {docChat.map((item: DocDataType, index: number) => {
        return (
          <div
            key={index}
            className={`mt-8 flex w-full flex-col items-center justify-center gap-y-3 px-7 ${
              index + 1 === docChat.length && 'pb-12'
            }`}
          >
            <p className="font-IranYekanDemiBold flex w-full items-center justify-start text-[15px]">
              {item?.stringDate}
            </p>
            <div
              onClick={handleDownload}
              className="flex h-[5rem] w-full cursor-pointer flex-wrap items-center justify-between gap-3 rounded-xl bg-MainBgOne p-3"
            >
              <div className="flex h-full items-center justify-center gap-x-3">
                <div className="flex flex-col items-center justify-center gap-y-[2px]">
                  <Image
                    className="h-[19px] w-[30px]"
                    width={30}
                    height={19}
                    src={'/svg/docs_chat/file_icon.svg'}
                    alt="file icon"
                  />
                  <p className="font-IranYekanDemiBold text-[20px] text-[#A0BEB0]">{item?.fileType}</p>
                </div>
                <div className="flex h-full flex-col items-start justify-around">
                  <p className="font-IranYekanMedium text-[#A0BEB0]">{item?.fileName}</p>
                  <p className="text-[15px] text-[#A0BEB0]">{item?.size}</p>
                </div>
              </div>
              <div className="flex h-full flex-col items-end justify-around">
                <span></span>
                <p className="font-IranYekanDemiBold text-[#A0BEB0]">{item?.date}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Index;
