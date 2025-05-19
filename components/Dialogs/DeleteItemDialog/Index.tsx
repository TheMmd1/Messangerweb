'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import { Dialog } from '@material-tailwind/react';
import Image from 'next/image';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

// بخش اضافه کردن تایپ ها
interface DeleteDialogProp {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  text: string;
  btnText?: string;
  btnStyle?: string;
  id?: number;
  hasTitle?: boolean;
  titleText?: string;
  handleFunc?: (id?: number) => void;
}

export default function Index({ open, setOpen, text, btnText, btnStyle, handleFunc, id, hasTitle, titleText }: DeleteDialogProp) {
  // اضافه کردن state ها و سایر tools ها
  const { t } = useTranslation();

  const handleDeleteFunc = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    setOpen(false);
    e.stopPropagation();
    setTimeout(() => {
      handleFunc && handleFunc(id);
    }, 500);
  };

  return (
    <Dialog
      placeholder=""
      onPointerEnterCapture={[]}
      size={'xs'}
      open={open}
      handler={setOpen}
      id="deleteDialogStyle"
      className=" p-2 sm:p-6"
      onPointerLeaveCapture={undefined}
    >
      <div dir={`${t('system_lang') === 'fa' ? 'rtl' : 'ltr'}`} className="h-full w-full">
        {hasTitle && (
          <div className="mb-3 flex items-center justify-start gap-2 font-bold">
            <Image src="/svg/default_profile/user-profile.svg" alt="" width={40} height={40} className="rounded-full" />
            <p className="!font-YekanBakhFaNum font-bold text-gray-900 lg:text-[20px]">{titleText}</p>
          </div>
        )}
        <div className='w-full'>
          <p className="w-full !font-YekanBakhFaNum font-semibold text-gray-900">{text}</p>
          <div className="mt-5 flex shrink-0 flex-wrap items-center justify-end pt-4 !font-YekanBakhFaNum">
            <button
              onClick={() => setOpen(false)}
              className="text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 rounded-md border border-transparent px-4 py-2 text-center !font-YekanBakhFaNum text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              {t('Cancel')}
            </button>
            <button
              onClick={(e) => handleDeleteFunc(e)}
              className={`${btnStyle ? btnStyle : 'bg-green-600 hover:bg-green-700 focus:bg-green-700 active:bg-green-700'} ml-2 rounded-md border border-transparent px-4 py-2 text-center !font-YekanBakhFaNum text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg focus:shadow-none`}
              type="button"
            >
              {btnText || t('confirm')}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
