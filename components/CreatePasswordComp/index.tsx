'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import Image from 'next/image';
import { useState } from 'react';
import OTPInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import BackButton from '../BackButton/BackButton';
import { handleBack } from '@/store/slices/ChangeSilde';
import { useTranslation } from 'react-i18next';

function Index() {
  // اضافه کردن state ها و سایر tools ها
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [otpAgain, setOtpAgain] = useState('');
  const [isPassAgain, setIsPassAgain] = useState(false);

  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-center">
      <header className="flex h-[8dvh] w-full items-center justify-end">
        <nav className={`flex w-full items-center justify-between px-5 ${localStorage.getItem('lang') === 'fa' ? 'ltr-custome' : 'rtl-custome'}`}>
          <BackButton />
          <p className="font-IranYekanBold text-[16px] text-white">{t('create_password')}</p>
          <span className="w-[35px]"></span>
        </nav>
      </header>
      <div className="flex h-[calc(100dvh-8dvh)] w-full flex-1 flex-col items-center justify-center rounded-t-[30px] bg-MainBgTwo p-[15px]">
        <Image width={1000} height={1000} src="/svg/homePage/CreatePass/create_pass_image.svg" alt="create pass image" />
        <p className="font-IranYekanBold my-[25px] text-[21px] text-MainBgThree">{t('create_password')}</p>
        <p dir={`${t('system_lang') === 'fa' ? 'rtl' : 'ltr'}`} className="font-IranYekanRegular my-[25px] text-[12px] text-[#606060]">
          {isPassAgain ? t('re_enter_password_application') : t('enter_password_application')}
        </p>
        <form className="flex w-full flex-col gap-2 px-[2vw] sm:w-fit">
          {isPassAgain ? (
            <div className="flex w-full justify-center gap-2">
              <OTPInput
                value={otpAgain}
                onChange={setOtpAgain}
                inputType="number"
                numInputs={4}
                renderInput={(props) => <input dir="ltr" {...props} />}
                inputStyle={{
                  fontSize: '25px',
                  width: '9dvh',
                  height: '9dvh',
                  maxWidth: '54px',
                  maxHeight: '54px',
                  aspectRatio: '1/1',
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                  outline: 'none',
                  direction: 'ltr',
                  boxShadow: '0 1px 5px 1px #00000021',
                }}
                containerStyle={{
                  direction: 'ltr',
                  width: '100%',
                  justifyContent: 'center',
                  gap: '1rem',
                }}
              />
            </div>
          ) : (
            <div className="flex w-full justify-center gap-2">
              <OTPInput
                value={otp}
                onChange={setOtp}
                inputType="number"
                numInputs={4}
                renderInput={(props) => <input dir="ltr" {...props} />}
                inputStyle={{
                  fontSize: '25px',
                  width: '9dvh',
                  height: '9dvh',
                  maxWidth: '54px',
                  maxHeight: '54px',
                  aspectRatio: '1/1',
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                  outline: 'none',
                  direction: 'ltr',
                  boxShadow: '0 1px 5px 1px #00000021',
                }}
                containerStyle={{
                  direction: 'ltr',
                  width: '100%',
                  justifyContent: 'center',
                  gap: '1rem',
                }}
              />
            </div>
          )}
        </form>
      </div>
      <div className={`flex w-full items-center bg-MainBgTwo p-5 ${t('system_lang') === 'fa' ? 'justify-end' : 'justify-start'}}`}>
        {!isPassAgain ? (
          <button
            onClick={() => setIsPassAgain(!isPassAgain)}
            type="submit"
            className={`flex items-center gap-2 rounded-[10px] bg-MainBgThree px-7 py-1 text-[1.9dvh] text-white shadow-[0px_10px_20px_#00000036] sm:px-5 sm:py-2 ${t('system_lang') === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}
          >
            {t('next')}
            <Image
              width={40}
              height={40}
              className="translate-y-[4px] lg:translate-y-[5px] xl:w-[2rem]"
              src="/images/homePage/right-arrow.svg"
              alt=""
            />
          </button>
        ) : (
          <button
            onClick={() => dispatch(handleBack())}
            type="submit"
            className={`flex items-center gap-2 rounded-[10px] bg-MainBgThree px-7 py-1 text-[1.9dvh] text-white shadow-[0px_10px_20px_#00000036] sm:px-7 sm:py-3`}
          >
            {t('confirm')}
          </button>
        )}
      </div>
    </div>
  );
}

export default Index;
