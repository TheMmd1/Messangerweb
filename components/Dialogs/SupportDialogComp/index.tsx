'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import { Dialog } from '@material-tailwind/react';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

// بخش اضافه کردن تایپ ها
interface SupportDialogProp {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Index({ open, setOpen }: SupportDialogProp) {
  // اضافه کردن state ها و سایر tools ها
  const { t } = useTranslation();

  return (
    <Dialog
      placeholder=""
      onPointerEnterCapture={[]}
      size={'sm'}
      open={open}
      handler={setOpen}
      className="p-2 sm:p-6"
      onPointerLeaveCapture={undefined}
    >
      <div className="h-full w-full">
        <p className="font-IranYekanBold text-black">{t('support')}</p>
        <div className="mt-7 space-y-3">
          <div className="flex items-center gap-3">
            <Image width={30} height={30} alt="" src="/svg/Setting/call-svgrepo-com.svg" />
            <p className="font-IranYekanRegular">09037180223</p>
          </div>
          <div className="flex items-center gap-3">
            <Image width={25} height={25} alt="" src="/svg/Setting/map-pin-svgrepo-com (1).svg" />
            <p className="font-IranYekanRegular">تهران-خیابان کرمان-فرعی 3-پلاک 1</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-end">
          <p
            onClick={() => setOpen(false)}
            className="font-IranYekanDemiBold ml-5 cursor-pointer text-[#38a271]"
          >
            {t('confirm')}
          </p>
        </div>
      </div>
    </Dialog>
  );
}
