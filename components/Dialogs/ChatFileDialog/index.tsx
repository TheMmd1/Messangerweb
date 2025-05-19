'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import { setChatFileDialog } from '@/store/slices/ChatFileDialog';
import { Dialog } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-jalaali';
import { useTranslation } from 'react-i18next';

// بخش اضافه کردن تایپ ها
interface frontUrlType {
  url?: string;
  type?: string;
  name?: string;
  file?: React.ChangeEvent<HTMLInputElement>;
}
interface ChatFileDialog {
  ChatFileDialog: boolean;
}
interface conversionType {
  type: string;
  url: string | undefined;
  fileName?: string;
  file: React.ChangeEvent<HTMLInputElement> | undefined;
  id: number;
  text?: string;
  createdAt: string;
  read: boolean;
}
interface ChatFileDialogProps {
  frontImage: frontUrlType[];
  ImageRemoveHandler: CallableFunction;
  setConversionData: CallableFunction;
}

const Index = ({ frontImage, ImageRemoveHandler, setConversionData }: ChatFileDialogProps) => {
  // اضافه کردن state ها و سایر tools ها
  const dispatch = useDispatch();
  const { t } = useTranslation();
  moment.loadPersian({ usePersianDigits: true, dialect: 'persian-modern' });
  const chatFileDialog = useSelector((state: ChatFileDialog) => state.ChatFileDialog);

  useEffect(() => {
    if (frontImage.length < 1) {
      dispatch(setChatFileDialog(false));
    }
  }, [dispatch, frontImage]);

  // تابع ارسال پیام با فرمت file ======> البته به صورت دستی هست و باید ادیت بشود
  const sendFileHandler = () => {
    setConversionData((prev: conversionType[]) => {
      // آرایه قبلی را کپی می‌کنیم
      const help: conversionType[] = [...prev];
      frontImage.forEach((item) => {
        help.push({
          type: 'file',
          url: item?.url,
          fileName: item?.type,
          file: item?.file,
          id: 1,
          createdAt: moment().format('HH:mm'),
          read: false,
        });
      });
      dispatch(setChatFileDialog(false));
      return help;
    });
  };

  return (
    // @ts-ignore
    <Dialog
      className="flex items-center justify-center bg-transparent shadow-none min-width-0"
      handler={() => dispatch(setChatFileDialog(!chatFileDialog))}
      size="sm"
      open={chatFileDialog}
    >
      <div className="flex w-full flex-col items-center justify-center gap-y-5 rounded-3xl bg-MainBgOne p-4">
        <div className="flex w-full flex-wrap items-center justify-center gap-5">
          {frontImage.map((item, index: number) => {
            return (
              <div className="relative flex h-[95px] min-w-[95px] items-center justify-center py-4" key={index}>
                {item.type && item.url && item?.type.includes('image') ? (
                  <>
                    <Image
                      onClick={() => ImageRemoveHandler(index)}
                      className="absolute -right-2 -top-2 z-20 cursor-pointer rounded-2xl"
                      src={'/svg/homePage/SingleConversation/xIcon.svg'}
                      width={25}
                      height={25}
                      alt="chat image"
                    />
                    <Image
                      // onClick={()=>dispatch}
                      className="h-[110px] w-[110px] rounded-3xl object-cover"
                      src={item?.url}
                      width={500}
                      height={500}
                      alt="chat image"
                    />
                  </>
                ) : (
                  <>
                    <Image
                      onClick={() => ImageRemoveHandler(index)}
                      className="absolute -right-2 -top-2 z-20 cursor-pointer rounded-2xl"
                      src={'/svg/homePage/SingleConversation/xIcon.svg'}
                      width={25}
                      height={25}
                      alt="chat image"
                    />
                    <div className="flex h-[110px] w-[110px] items-center justify-center overflow-hidden rounded-3xl bg-purple-500 text-white">
                      <p>{item?.type}</p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <button onClick={sendFileHandler} className="font-IranYekanBold rounded-xl bg-MainBgThree px-3 py-2 text-white">
          {t('send')}
        </button>
      </div>
    </Dialog>
  );
};

export default Index;
