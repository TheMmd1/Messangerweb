'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import Index from '@/components/Dialogs/DeleteItemDialog/Index';

// بخش اضافه کردن تایپ ها
interface Props {
  setIsWellComingPage: Dispatch<SetStateAction<boolean>>;
  showContent: boolean;
}

export default function WellcomingCompo({ setIsWellComingPage, showContent }: Props) {
  // اضافه کردن state ها و سایر tools ها
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`relative flex h-[100dvh] w-full flex-col items-center justify-center gap-[36px] ${!showContent ? 'opacity-0' : 'opacity-100'}`}
    >
      <Image className="lg:w-[20vw]" width={270} height={270} src="svg/splash/Path 54148.svg" alt="" />
      <p className="#38A271 font-YekanBakhFaNum text-[21px] lg:text-[1.5rem]">به اپلیکیشن چت خوش آمدید</p>
      <p className="px-6 text-center font-YekanBakhFaNum text-[13px] leading-[1.5rem] text-[#606060] sm:w-fit sm:text-[0.6rem] lg:text-[0.9rem]">
        قوانین حریم خصوصی را مطالعه کنید. روی گزینه موافقم و ادامه بزنید تا با قوانین و مقررات ما را تایید
        کنید.
      </p>
      <button className="font-YekanBakhFaNum text-[2.5dvh] text-[#38a271]" onClick={() => setOpen(true)}>
        دیدن قوانین
      </button>
      <button
        onClick={() => setIsWellComingPage(false)}
        className="absolute bottom-[35px] right-[17px] flex items-center justify-center gap-2 rounded-[20px] bg-[#38A271] p-2 px-7 py-1 font-YekanBakhFaNum text-white shadow-[0px_10px_20px_#00000036] sm:px-5 sm:py-2 lg:h-[8vh] lg:w-[13vw] lg:px-[5px] lg:text-[1.1vw] xl:text-[1rem]"
      >
        <Image
          width={40}
          height={40}
          className="translate-y-[4px] lg:translate-y-[5px] xl:w-[2rem]"
          alt=""
          src="/images/homePage/right-arrow.svg"
        />
        موافقم و ادامه
      </button>
      <Index
        setOpen={setOpen}
        open={open}
        text="احترام به حریم خصوصی: کاربران باید از ارسال پیام‌های آزاردهنده یا مزاحمت‌آمیز خودداری کنند و حریم خصوصی دیگران را محترم بشمارند.
عدم ارسال محتوای غیرقانونی: ارسال محتواهای توهین‌آمیز، خلاف قوانین یا هرگونه محتوا که موجب آسیب به دیگران شود، ممنوع است.
احترام به قوانین استفاده: هر کاربر موظف به رعایت شرایط و ضوابط پیام‌رسان است و از سوءاستفاده از پلتفرم خودداری کند.
امنیت حساب کاربری: کاربران باید از رمز عبور خود محافظت کرده و از اشتراک‌گذاری اطلاعات شخصی خود با دیگران خودداری کنند.
محتواهای تبلیغاتی و اسپم: ارسال پیام‌های تبلیغاتی و اسپم بدون اجازه دریافت از کاربران دیگر ممنوع است."
      />
    </div>
  );
}
