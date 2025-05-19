'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import Image from 'next/image';
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';
import Countdown from 'react-countdown';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import ChangePhoneNumber from './ChangePhoneNumber';
import React, { useState, useMemo, useCallback, Fragment, useEffect } from 'react';
import { accountVerify, signIn, signinVerify, signUp } from '../../Services/Login';

// بخش اضافه کردن تایپ ها
interface CountDownProps {
  minutes: number;
  seconds: number;
  completed: boolean;
}
interface UseSelectorStateType {
  userInformation: {
    data: string;
    userInformation: string;
    countryCode: string;
  };
}

const OTPField = () => {
  // اضافه کردن state ها و سایر tools ها
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [timer] = useState(Date.now() + 121000);
  const [isLoading, setIsLoading] = useState(false);
  const { userInformation, countryCode, data: otpCode } = useSelector((state: UseSelectorStateType) => state.userInformation);
  const [isTimerComplete, setIsTimerComplete] = useState<boolean>(true);

  // تابع بررسی احراز هویت
  const otpValidation = useCallback(() => {
    if (!otp.length) {
      toast.error('کد تایید دریافت شده را وارد نمایید');
      setError('کد تایید را وارد کنید');
    } else if (otp.length < 5) {
      setError('کد تایید را کامل وارد نمایید');
    } else if (otp.length == 5) {
      setError('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  // تابع ساخت تایمر برای ارسال دوباره رمز عبور
  const renderer = useMemo(() => {
    const CountdownRenderer = ({ minutes, seconds, completed }: CountDownProps) => {
      if (completed) {
        return <span>00:00</span>;
      } else {
        return (
          <span>
            <span>
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </span>
          </span>
        );
      }
    };
    CountdownRenderer.displayName = 'CountdownRenderer';

    return CountdownRenderer;
  }, []);

  const handleComplete = () => {
    setIsTimerComplete(false);
  };

  // تابع ارسال دوباره رمز عبور
  const handleReSendOtpPass = useCallback(async (): Promise<void> => {
    if (isTimerComplete) return;
    // setIsLoading(true);
    const formData: string = userInformation;
    if (!formData) {
      return;
    }

    try {
      const signUpRes = await signUp(formData);

      if (signUpRes?.success) {
        router.push('/otp-password');
      }
    } catch (error) {
      const errorMessage = (error as { error: string }).error;
      if (errorMessage === 'A user with this Information already exists.') {
        const signInRes = await signIn(formData);
        if (signInRes?.success) {
          router.push('/otp-password');
        }
      }
    }
  }, [isTimerComplete, router, userInformation]);

  useEffect(() => {
    (async () => {
      if (otp === otpCode) {
        await handleFormSubmit();
      }
    })();
  }, [otp, otpCode, router]);

  // تابع submit کردن فرم otp
  const handleFormSubmit = useCallback(
    async (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e?.preventDefault();
      setIsLoading(true);
      otpValidation();
      if (error) {
        setIsLoading(false);
        return;
      }

      try {
        const accountVerifyRes = await accountVerify(otp);
        if (accountVerifyRes?.success) {
          toast.success('خوش آمدید');
          router.push('/profile');
        } else {
          toast.success('مشکلی  در ورود پیش آمده!');
        }
      } catch (error) {
        const errorMessage = (error as { error: string })?.error;
        if (errorMessage === 'A user with this Information already exists.') {
          const signinVerifyRes = await signinVerify(otp);
          if (signinVerifyRes && signinVerifyRes.success) {
            router.push('/profile');
          } else {
            toast.error('مشکلی در ورود پیش آمده است');
          }
        }
        if (errorMessage === 'Verification code not found #404') {
          setError('کد تایید صحیح نمیباشد');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [error, otp, router, otpValidation]
  );

  return (
    <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[#EFF8F4] font-YekanBakhFaNum sm:bg-transparent">
      <Image
        src="/svg/splash/splash-page-img.svg"
        alt=""
        width={1000}
        height={1000}
        className="absolute left-0 top-0 z-[-1] hidden h-[100dvh] w-full scale-x-[2.5] scale-y-[2] opacity-[0.1] sm:block"
      />
      <div className="flex w-[90%] flex-col items-center justify-center rounded-[20px] bg-white p-[20px] text-center sm:w-[350px] sm:shadow-[0_.5px_10px_#00000029] sm:backdrop-blur-[6px] lg:w-[100dvh] lg:max-w-[460px] xl:w-[60dvh] xl:p-[1.5rem] xl:pb-10">
        <div className="mb-[40px] grid w-fit gap-5 text-center sm:mb-[60px]">
          <h2 className="text-[16px] text-[#38A271] xl:text-[1.1rem]">{countryCode ? 'تایید شماره تلفن همراه' : 'تایید پست الکترونیکی'}</h2>
          <p className="text-[12px] leading-5 text-MainTextTwo text-[#606060] sm:mt-1 xl:text-[.7rem]">
            <span>کد تایید برای {countryCode ? 'شماره' : 'پست الکترونیکی '}</span>
            <span className="px-1">
              <span>{userInformation?.slice(2)}</span>
              {countryCode && (
                <Fragment>
                  <span>-</span>
                  <span>{countryCode.slice(1)}+</span>
                </Fragment>
              )}
            </span>
            ارسال شده است.
          </p>
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="text-[12px] text-[#38A271] xl:text-[.8rem]"
          >
            {countryCode ? 'شماره تلفن همراه اشتباه هست؟' : 'پست الکترونیکی اشتباه است؟'}
          </button>
        </div>
        <form className="flex w-full flex-col gap-2 px-[2vw] sm:w-fit">
          <div className="flex w-full justify-center gap-2">
            <OtpInput
              shouldAutoFocus={true}
              value={otp}
              onChange={setOtp}
              inputType="number"
              numInputs={5}
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
                border: `${error ? (otp.length == 5 ? '1px solid #45d818 ' : '1px solid #e94242') : ''}`,
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
          <p className={`text-center xl:text-[.7rem] ${error ? 'text-red-500' : 'text-MainTextTwo'} mt-[16px] text-[12px]`}>
            {error ? error : 'کد ۵ رقمی را وارد نمایید'}
          </p>
        </form>
      </div>
      <div className="absolute bottom-[50px] right-0 flex w-full items-center justify-between px-[18px]">
        <button
          onClick={(e) => handleFormSubmit(e)}
          className="my-3 flex h-[6.5dvh] w-[30dvw] items-center justify-evenly rounded-[10px] bg-MainBgThree p-2 text-MainBgOne lg:w-[12dvw] lg:max-w-[130px]"
        >
          {isLoading ? (
            <div style={{ borderTop: 'none' }} className="mr-3 h-5 w-5 animate-spin rounded-full border"></div>
          ) : (
            <Image
              width={40}
              height={40}
              className="translate-y-[4px] lg:translate-y-[5px] xl:w-[2rem]"
              src="/images/homePage/right-arrow.svg"
              alt=""
            />
          )}
          تایید
        </button>
        <div>
          <div className="mb-[14px] text-end text-[#606060] md:text-[1.3rem] xl:text-[3.2dvh]">
            <Countdown onComplete={handleComplete} date={timer} renderer={renderer} />
          </div>
          <div
            onClick={handleReSendOtpPass}
            className={`md:text-[1rem] xl:text-[2.2dvh] ${
              isTimerComplete
                ? 'pointer-events-none opacity-40 xl:text-[2.2dvh]'
                : 'pointer-events-auto cursor-pointer text-[#38A271] xl:text-[2.2dvh]'
            }`}
          >
            کد تایید ارسال نشد؟
          </div>
        </div>
      </div>
      <ChangePhoneNumber setOpen={setOpen} open={open} />
    </div>
  );
};

export default OTPField;
