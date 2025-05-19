'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import BackButton from '@/components/BackButton/BackButton';
import { addSlide } from '@/store/slices/ChangeSilde';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

const Index = () => {
  // اضافه کردن state ها و سایر tools ها
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <main className="flex h-full min-h-[100dvh] w-full items-start justify-center bg-[#929292]">
      <div className="flex h-full min-h-[100dvh] w-full items-start justify-center bg-MainBgThree">
        <div className="flex h-full w-full flex-col items-start justify-center">
          {/* هدر */}
          <header className="flex h-[8dvh] w-full items-center justify-end">
            <nav
              className={`flex w-full items-center justify-between px-5 ${localStorage.getItem('lang') === 'fa' ? 'ltr-custome' : 'rtl-custome'}`}
            >
              <BackButton />
              <p className="font-IranYekanBold text-center text-[1.5dvh] text-white md:text-[16px]">
                {t('organizations')}
              </p>
              <div className="flex w-[5rem] items-center justify-end gap-x-2"></div>
            </nav>
          </header>
          <div className="box-shadow relative flex h-full w-full flex-col items-center justify-start overflow-hidden rounded-t-[30px] bg-MainBgTwo pt-3">
            <div className="your-component-scrollbar ltr-custome flex h-[calc(100dvh-8dvh)] w-[92%] flex-col items-center justify-start pb-28">
              <div className="rtl-custome mt-12 flex w-[95%] flex-col items-center justify-center gap-y-10 rounded-3xl bg-MainBgTwo p-5">
                <Image
                  className="h-[230px] w-full bg-MainBgTwo object-contain"
                  width={300}
                  height={300}
                  src={'/images/group/welcome-group.png'}
                  alt="create image Group"
                />
                <div className="flex w-full flex-col items-center justify-center gap-y-5">
                  <h2 className="font-IranYekanBold text-[20px] text-MainTextOne">
                    {t('introduction_organizations')}
                  </h2>
                  <p className="font-IranYekanDemiBold w-[85%] text-center leading-8 text-MainTextTwo">
                    {t('organizations_theory')}
                  </p>
                </div>
              </div>
            </div>
            <div
              onClick={() => dispatch(addSlide('addGroup'))}
              className="shadoow-3D absolute bottom-7 right-5 flex h-[60px] cursor-pointer items-center justify-start gap-x-2 rounded-2xl bg-MainBgThree pl-8 pr-3 transition-all duration-200 hover:bg-[#4eb887]"
            >
              <p className="font-IranYekanDemiBold text-white">{t('create_organization')}</p>
              <Image
                width={30}
                height={30}
                className="-mb-1 h-[30px] w-[30px] object-contain"
                src={'/svg/newGroup/nextArrow.svg'}
                alt="next arrow Icon"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
