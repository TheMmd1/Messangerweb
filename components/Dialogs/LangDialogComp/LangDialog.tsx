'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import React from 'react';
import { Dialog } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenDialog } from '@/store/slices/DialogSlice';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import i18next from 'i18next';

// بخش اضافه کردن تایپ ها
interface DialogStateType {
  openDialog: boolean;
}

export default function LangDialog() {
  // اضافه کردن state ها و سایر tools ها
  const openDialog = useSelector((state: DialogStateType) => state.openDialog);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const langs = [
    { faTitle: 'فارسی', enTitle: 'Persian', lang: 'fa' },
    { faTitle: 'انگلیسی', enTitle: 'English', lang: 'en' },
  ];

  // تابع بستن dialog
  const handleClose = () => dispatch(setOpenDialog(!openDialog));

  // تابع تغییر زبان برنامه
  const changeLanguageHandler = (lang: string) => {
    i18next.changeLanguage(lang);
    localStorage.setItem('lang', lang);
    handleClose();
  };

  return (
    <>
      <Dialog
        placeholder=""
        size={'xs'}
        open={openDialog}
        handler={handleClose}
        className="p-2 sm:p-6"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="mb-6 flex items-center justify-between text-xl font-medium text-gray-900">
          <p>{t('app language')}</p>
          <Image
            width={30}
            height={30}
            onClick={handleClose}
            src="/svg/homePage/lang/close-svgrepo-com.svg"
            className="w-[30px] cursor-pointer rounded bg-[#38A271] p-1"
            alt=""
          />
        </div>

        <div className="flex w-full items-center justify-center gap-4 md:p-4">
          {langs.map((item, index) => (
            <div
              onClick={() => changeLanguageHandler(item.lang)}
              key={index}
              className="flex-1 cursor-pointer rounded-[20px] border p-2 text-center font-medium transition-all duration-200 hover:border-[#38A271] hover:bg-[#38a27111] hover:text-[#38A271] lg:w-[10vw] lg:flex-none"
            >
              <p>{item.faTitle}</p>
              <p>{item.enTitle}</p>
            </div>
          ))}
        </div>
      </Dialog>
    </>
  );
}
