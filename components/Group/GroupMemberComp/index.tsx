'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import BackButton from '@/components/BackButton/BackButton';

const Index = () => {
  // ضافه کردن state ها و سایر tools ها
  const { t } = useTranslation();

  return (
    <main className="flex h-full min-h-[100dvh] w-full items-start justify-center bg-MainBgTwo">
      <div className="flex h-full min-h-[100dvh] w-full items-start justify-center bg-MainBgThree">
        <div className="flex h-full w-full flex-col items-start justify-center">
          <header className="flex h-[8dvh] w-full items-center justify-end">
            <nav
              className={`flex w-full items-center justify-between px-5 ${localStorage.getItem('lang') === 'fa' ? 'ltr-custome' : 'rtl-custome'}`}
            >
              <BackButton />
              <p className="font-YekanBakhFaNum text-[13px] text-white md:text-[16px]">{t('members')} (۳)</p>
              <Link href={'/'} className="flex w-[5rem] items-center justify-end">
                <Image
                  width={35}
                  height={30}
                  className="w-[2.2dvh] cursor-pointer object-contain md:w-[2.2dvh]"
                  src={'/svg/homePage/searchIcon.svg'}
                  alt="icon image"
                />
              </Link>
            </nav>
          </header>
          <div className="box-shadow flex h-full w-full flex-col items-center justify-start rounded-t-[30px] bg-MainBgOne pt-3">
            <div className="your-component-scrollbar ltr-custome flex h-[calc(100dvh-8dvh)] w-[92%] flex-col items-center justify-start pb-28">
              <div className="rtl-custome mt-6 flex w-[95%] cursor-pointer items-center justify-between rounded-3xl bg-MainBgTwo py-3 pl-5 pr-3">
                <div className="flex h-full w-full items-center justify-start gap-x-3">
                  <div className="relative flex h-[55px] w-[55px] items-center justify-center rounded-full border border-white bg-MainBgThree">
                    <Image
                      width={30}
                      height={30}
                      className="h-1/2 w-1/2 rounded-full object-contain"
                      src={'/svg/homePage/Call/callIcon.svg'}
                      alt="icon image"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center gap-y-2">
                    <p className="font-YekanBakhFaNum text-[18px] text-MainTextOne">
                      {t('create_contact_link')}
                    </p>
                    <p className="font-YekanBakhFaNum text-[14px] text-MainTextTwo">
                      {t('contact_link_desc')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rtl-custome mt-6 flex w-[95%] flex-col items-center justify-center gap-y-3">
                <div className="flex w-full flex-col items-center justify-center gap-y-3 rounded-3xl bg-MainBgOne p-4">
                  <div className="flex w-full items-center justify-start gap-x-3">
                    <Image
                      className="h-[60px] w-[60px] rounded-full object-cover object-top"
                      src={'/svg/default_profile/user-profile.svg'}
                      width={60}
                      height={60}
                      alt="add person"
                    />
                    <div className="flex w-[calc(100%-5rem)] items-center justify-between">
                      <div className="flex flex-col items-start justify-center gap-y-3">
                        <p className="font-YekanBakhFaNum text-MainTextOne">احمد</p>
                        <p className="font-YekanBakhFaNum text-[14px] text-MainTextTwo">در دسترس</p>
                      </div>
                      <p className="font-IranYekanDemiBold flex cursor-pointer items-center justify-end rounded-2xl bg-MainBgTwo px-4 py-2 text-[15px] text-[#38A271]">
                        {t('creator')}
                      </p>
                    </div>
                  </div>
                  <span className="h-[1px] w-full bg-[#C5E0D3]"></span>
                  <div className="flex w-full items-center justify-start gap-x-3">
                    <Image
                      className="h-[60px] w-[60px] rounded-full object-cover object-top"
                      src={'/svg/default_profile/user-profile.svg'}
                      width={60}
                      height={60}
                      alt="add person"
                    />
                    <div className="flex w-[calc(100%-5rem)] items-center justify-between">
                      <div className="flex flex-col items-start justify-center gap-y-3">
                        <p className="font-YekanBakhFaNum text-MainTextOne">سعید ابراهیمی</p>
                        <p className="font-YekanBakhFaNum text-[14px] text-MainTextTwo">در دسترس</p>
                      </div>
                    </div>
                  </div>
                  <span className="h-[1px] w-full bg-[#C5E0D3]"></span>
                  <div className="flex w-full items-center justify-start gap-x-3">
                    <Image
                      className="h-[60px] w-[60px] rounded-full object-cover object-top"
                      src={'/svg/default_profile/user-profile.svg'}
                      width={60}
                      height={60}
                      alt="add person"
                    />
                    <div className="flex w-[calc(100%-5rem)] items-center justify-between">
                      <div className="flex flex-col items-start justify-center gap-y-3">
                        <p className="font-YekanBakhFaNum text-MainTextOne">2312 223 912 98+</p>
                        <p className="font-YekanBakhFaNum text-[14px] text-MainTextTwo">در دسترس</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
