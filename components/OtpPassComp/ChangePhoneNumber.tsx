'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { Dialog } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';

// بخش اضافه کردن تایپ ها
interface ChangePhoneNumberProp {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
interface UseSelectorStateType {
  userInformation: {
    countryCode: string;
  };
}

export default function ChangePhoneNumber({ setOpen, open }: ChangePhoneNumberProp) {
  // اضافه کردن state ها و سایر tools ها
  const router = useRouter();
  const { t } = useTranslation();
  const { countryCode } = useSelector((state: UseSelectorStateType) => state.userInformation);
  return (
    <Dialog
      placeholder=""
      onPointerEnterCapture={[]}
      size={'xs'}
      open={open}
      handler={setOpen}
      className="bg-[#EFF8F4] p-6"
      onPointerLeaveCapture={undefined}
    >
      <div className="flex w-full flex-col items-center justify-center gap-20">
        <p className="text-center text-lg font-semibold text-gray-800">
          {countryCode ? t('change_phone_number') : t('change_email')}
        </p>
        <div className="flex w-full gap-5 sm:px-7">
          <button
            onClick={() => router.push('/')}
            className="flex-1 rounded-[10px] border-0 border-none bg-[#38A271] px-[1.1rem] py-[.625rem] font-semibold text-white shadow-[0_1px_3px] outline-none sm:text-xl"
          >
            {t('yes')}
          </button>
          <button
            onClick={() => setOpen(false)}
            className="flex-1 rounded-[10px] border-none bg-red-700 px-[1.1rem] py-[.625rem] font-semibold text-white shadow-[0_1px_3px] outline-none sm:text-xl"
          >
            {t('no')}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
