'use client';

import { isFile, isImage, isVideo } from '@/utils/publicFunctions';
// اضافه کردن کامپوننت ها و پکیج ها
import { Dialog } from '@material-tailwind/react';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

// بخش اضافه کردن تایپ ها
interface UploadDialogProp {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id?: number;
  filePreview: string;
  func: VoidFunction;
  fileType: string | null;
  fileName?: string;
}

export default function Index({ open, setOpen, filePreview, func, fileType, fileName }: UploadDialogProp) {
  // اضافه کردن state ها و سایر tools ها
  const { t } = useTranslation();

  const getDialogTitle = () => {
    if (isImage(fileType!)) return t('sendPhoto');
    if (isVideo(fileType!)) return t('sendVideo');
    return t('sendFile');
  };

  return (
    <Dialog
      placeholder=""
      onPointerEnterCapture={[]}
      size={'xs'}
      open={open}
      handler={setOpen}
      id="deleteDialogStyle"
      className="!h-[400px] p-2 sm:p-6"
      onPointerLeaveCapture={undefined}
    >
      <div className="flex h-full w-full flex-col">
        <div className="mb-3 flex items-center justify-end gap-9 font-bold">
          <p className="!font-YekanBakhFaNum font-bold text-gray-900 lg:text-[20px]">{getDialogTitle()}</p>
          <Image
            onClick={() => setOpen(false)}
            src="/svg/homePage/lang/close-svgrepo-com.svg"
            alt=""
            width={25}
            height={25}
            className="cursor-pointer rounded-full"
          />
        </div>
        {isImage(fileType!) && (
          <div style={{ backgroundImage: `url(${filePreview})` }} className="flex-1 overflow-hidden rounded bg-contain bg-center bg-no-repeat"></div>
        )}
        {isVideo(fileType!) && (
          <div className="flex-1 overflow-hidden rounded bg-contain bg-center bg-no-repeat">
            <video src={`${filePreview}`} controls className="h-[250px] w-full" />
          </div>
        )}
        {isFile(fileType!) && (
          <div className="flex flex-1 flex-col items-center justify-center gap-2">
            <Image src="/svg/homePage/file-icon.svg" alt="" width={40} height={40} className="w-[35%]" />
            <p>{fileName}</p>
          </div>
        )}
        <div>
          <div className="mt-2 flex shrink-0 flex-wrap items-center justify-start pt-4 !font-YekanBakhFaNum">
            <button
              onClick={func}
              className="text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 rounded-md border border-transparent bg-MainBgThree px-4 py-2 text-center !font-YekanBakhFaNum text-sm font-semibold text-white transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              {t('send')}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
