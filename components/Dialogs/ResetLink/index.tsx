'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import { Dialog } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction } from 'react';

// بخش اضافه کردن تایپ ها
interface DeleteDialogProp {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Index({ open, setOpen }: DeleteDialogProp) {
  // اضافه کردن state ها و سایر tools ها
  const { t } = useTranslation();

  return (
    <Dialog
      placeholder=""
      onPointerEnterCapture={[]}
      size={'xs'}
      open={open}
      handler={setOpen}
      className="p-2 sm:p-6"
      onPointerLeaveCapture={undefined}
    >
      <div className="h-full w-full">
        <p className="font-IranYekanRegular w-full">{t('reset_link')}</p>
        <div className="flex w-full items-center border-b py-2">
          <input
            type="text"
            autoFocus
            placeholder="New link"
            className="h-full w-full border-none text-left outline-none"
          />
          <p>/Persianchat.ir</p>
        </div>
        <div className="font-IranYekanRegular mt-5 flex shrink-0 flex-wrap items-center justify-start">
          <button
            onClick={() => setOpen(false)}
            className="ml-2 rounded-md border border-transparent bg-green-600 px-4 py-2 text-center text-sm text-white shadow-md transition-all hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700"
            type="button"
          >
            {t('confirm')}
          </button>
          <button
            onClick={() => setOpen(false)}
            className="text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 rounded-md border border-transparent px-4 py-2 text-center text-sm transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            {t('Cancel')}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
