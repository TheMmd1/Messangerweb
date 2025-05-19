'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import Image from 'next/image';
import Cookies from 'js-cookie';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import WellcomingCompo from './WellcomingCompo';
import { signIn, signUp } from '@/Services/Login';
import { useForm, Controller } from 'react-hook-form';
import { getOtpCode, userData } from '@/store/slices/LoginFormSlice';
import { useCallback, useEffect, useState } from 'react';
import useValidationRules from '../../utils/UserFormValidation';
import useCountriesInfo, { FormData, SignInResponse } from '@/utils/useCountriesInfo';

// بخش اضافه کردن تایپ ها
interface SignUpResponse {
  success: boolean;
  data?: {
    message?: string;
    success: boolean;
  };
}

export default function LoginForm() {
  // اضافه کردن state ها و سایر tools ها
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { getValidationRules } = useValidationRules();
  const [userInformation, setUserInformation] = useState('');
  const [contentShow, setContentShow] = useState<boolean>(false);
  const [showEmailForm, setShowEmailForm] = useState<boolean>(false);
  const [isWellComingPage, setIsWellComingPage] = useState<boolean>(true);
  // prettier-ignore
  const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
    mode: 'onChange',
  });
  const { countryCode, selectedLang, handleCountryChange, CountryName } = useCountriesInfo();

  // برای بستن صفحه خوش آمد گویی برای اولین بار
  useEffect(() => {
    if (Cookies.get('splash')) {
      setIsWellComingPage(false);
    }
    setTimeout(() => {
      setContentShow(true);
    }, 2000);
  }, []);

  // بررسی زبان و تم برنامه برای اولین باز
  useEffect(() => {
    if (!Cookies.get('theme') || Cookies.get('theme') === '') {
      Cookies.set('theme', 'light');
    }
    if (!!window) {
      if (!localStorage.getItem('lang') || localStorage.getItem('lang') === '') {
        localStorage.setItem('lang', 'fa');
      }
    }
  }, []);

  // تابع بررسی تغییرات فرم
  function handleChangeForm() {
    setShowEmailForm(!showEmailForm);
    setUserInformation('');
  }

  // تابع submit کردن فرم
  const onSubmit = useCallback(
    async (data: FormData): Promise<void> => {
      setIsLoading(true);
      const formData: string = data.phoneNumber ? countryCode?.slice(1) + data.phoneNumber : data.email;
      dispatch(
        userData({
          userInformation: data.email || countryCode?.slice(1) + data.phoneNumber,
          countryCode: countryCode,
        })
      );

      if (!formData) {
        return;
      }
      try {
        const signUpRes: SignUpResponse = await signUp(formData);
        dispatch(getOtpCode(signUpRes.data));
        if (signUpRes?.success) {
          router.push('/otp-password');
          toast.success('کد تایید ارسال شد. لطفا گوشی خود را چک کنید.');
        }
      } catch (error) {
        const errorMessage = (error as { error: string })?.error;
        if (errorMessage === 'A user with this Information already exists.') {
          const signInRes: SignInResponse = await signIn(formData);
          dispatch(getOtpCode(signInRes.data));
          if (signInRes?.success) {
            toast.success('کد تایید ارسال شد. لطفا گوشی خود را چک کنید.');
            router.push('/otp-password');
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, router, countryCode]
  );

  return isWellComingPage ? (
    <WellcomingCompo setIsWellComingPage={setIsWellComingPage} showContent={contentShow} />
  ) : (
    <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[#EFF8F4] px-[4.36vw] font-YekanBakhFaNum sm:bg-transparent lg:px-[18px]">
      <Image
        src="/svg/splash/splash-page-img.svg"
        alt=""
        width={1000}
        height={1000}
        className="absolute left-0 top-0 z-[-1] hidden h-[100dvh] w-full scale-x-[2.5] scale-y-[2] opacity-[0.1] sm:block"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full rounded-[20px] bg-white p-[20px] text-center sm:w-[350px] sm:shadow-[0_.5px_10px_#00000029] sm:backdrop-blur-[6px] lg:w-[100dvh] lg:max-w-[460px] xl:max-w-[500px] xl:p-[1.5rem] xl:pb-10"
      >
        <p className="text-[16px] text-[#38A271] xl:text-[1.1rem]">
          {!showEmailForm ? 'شماره تلفن همراه خود را وارد نمایید' : 'پست الکترونیک خود را وارد نمایید'}
        </p>
        <p className="my-5 text-[12px] text-[#606060] sm:mt-5 xl:text-[.7rem]">
          {!showEmailForm ? 'شماره تلفن همراه خود را برای احراز هویت وارد نمایید.' : 'پست الکترونیک خود را برای احراز هویت وارد نمایید.'}
        </p>

        {!showEmailForm ? (
          <div className="flex w-full flex-col items-center justify-center gap-5 rounded-[20px] px-[19px]">
            <div className="w-full border-b border-b-[#38A271] lg:mb-[1rem] xl:mb-[1.5rem]">
              <Select
                defaultValue={CountryName[0]}
                value={CountryName.find((option) => option.value === selectedLang)}
                className="basic-single"
                classNamePrefix="select"
                isSearchable={true}
                name="Countries"
                options={CountryName}
                isRtl={true}
                onChange={(selected) => {
                  handleCountryChange(selected, 'country');
                }}
              />
            </div>

            <div className="flex w-full items-center justify-between gap-5 text-[20px]">
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                rules={getValidationRules('phoneNumber')}
                render={({ field }) => (
                  <div className="flex w-full items-center gap-2">
                    <input
                      autoComplete="off"
                      style={{ direction: 'ltr' }}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        field.onChange(value);
                        setUserInformation(value);
                      }}
                      className="min-h-[38px] w-full border-b border-b-[#38A271] bg-transparent text-center text-[16px] outline-none xl:text-[1.15rem] xl:placeholder:text-[1.1rem]"
                      autoFocus
                      type="tel"
                      value={userInformation}
                      placeholder="شماره تلفن همراه"
                    />
                    <span className="ltr-custome flex min-h-[38px] w-[25%] items-center justify-center border-b border-b-[#38A271] text-lg xl:text-[1.1rem]">
                      {countryCode}
                    </span>
                  </div>
                )}
              />
            </div>
            {errors.phoneNumber && <p className="text-[12px] text-red-500 xl:text-[.8rem]">{errors.phoneNumber.message}</p>}
          </div>
        ) : (
          <div className="flex h-[167px] w-full flex-col items-center justify-center gap-5 rounded-[20px] px-[19px]">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={getValidationRules('email')}
              render={({ field }) => (
                <input
                  autoComplete="off"
                  style={{ direction: 'ltr' }}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setUserInformation(e.target.value);
                  }}
                  value={userInformation}
                  autoFocus
                  className="text-stone-800 w-full border-b border-b-[#38A271] bg-transparent text-center text-lg outline-none xl:text-[1.1rem] xl:placeholder:text-[1.1rem]"
                  type="email"
                  placeholder="پست الکترونیک"
                />
              )}
            />
            {errors.email && <p className="text-[12px] text-red-500 xl:text-[.8rem]">{errors.email.message}</p>}
          </div>
        )}
      </form>
      <button onClick={handleChangeForm} className="w-fit p-4 text-center font-medium text-[#38A271] xl:mt-7 xl:text-[1.1rem]">
        {!showEmailForm ? 'ورود از طریق پست الکترونیک' : 'ورود از طریق شماره تلفن همراه'}
      </button>

      <div className="absolute bottom-[35px] right-[17px]">
        {/* button responsive fixed */}
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="my-3 flex h-[6.5dvh] w-[14dvh] md:w-[13dvw] items-center justify-evenly rounded-[10px] bg-MainBgThree p-2 text-MainBgOne lg:w-[12dvw] lg:max-w-[130px]"
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
          بعدی
        </button>
      </div>
    </div>
  );
}
