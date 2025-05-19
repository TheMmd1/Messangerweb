'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import { setOpenDialog } from '@/store/slices/DialogSlice';
import { setNewProfile } from '@/store/slices/ProfileDialog';
import SupportDialog from '../Dialogs/SupportDialogComp/index';
import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { addSlide } from '@/store/slices/ChangeSilde';
import BackButton from '../BackButton/BackButton';
import { Profile } from '@/store/slices/AccountInformationSlice';
import PulseLoading from '../PulseLoading/Index';
const LangDialog = React.memo(React.lazy(() => import('../Dialogs/LangDialogComp/LangDialog')));

// بخش اضافه کردن تایپ ها
export interface UserName {
  accountInfo: {
    first_name?: string;
    bio?: string;
  };
}

const Index = () => {
  // اضافه کردن state ها و سایر tools ها
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [openSupportDialog, setOpenSupportDialog] = useState<boolean>(false);
  const { profile, self_profile } = useSelector(
    (state: { accountInfo: { profile: Profile; self_profile: Profile } }) => state.accountInfo
  );

  // تابع برای باز کردن dialog زبان برنامه
  const handleLangFunc = () => {
    dispatch(setOpenDialog(true));
  };

  return (
    <main className="relative flex h-[100dvh] w-full items-center justify-center bg-MainBgOne">
      <div className="your-component-scrollbar flex min-h-[100dvh] w-full flex-col items-center justify-start bg-MainBgThree">
        <header className="flex h-[8dvh] w-full items-center justify-end">
          <nav className={`flex w-full items-center justify-between px-5 ${localStorage.getItem('lang') === 'en' ? 'rtl-custome' : 'ltr-custome'}`}>
            <BackButton />
            <p className="font-IranYekanBold text-[2dvh] text-white">{t('setting')}</p>
            <span className="w-[35px]"></span>
          </nav>
        </header>
        <section className="box-shadow relative flex h-[calc(100dvh-8dvh)] w-full items-start justify-center rounded-t-[30px] bg-MainBgOne pt-4">
          <div className="mb-5 flex h-full w-full flex-col items-center justify-start gap-y-4">
            <div
              className={
                'flex h-[10dvh] w-[90%] items-center justify-between rounded-[20px] bg-MainBgOne px-3 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.3)]'
              }
            >
              <div className="flex h-full items-center justify-start gap-x-3">
                <Image
                  onClick={() => dispatch(setNewProfile(true))}
                  width={55}
                  height={55}
                  className="h-[5dvh] w-[5dvh] md:h-[8dvh] md:w-[8dvh] cursor-pointer rounded-full object-cover object-top"
                  src={'/svg/default_profile/user-profile.svg'}
                  alt="icon image"
                />
                <div className="flex flex-col items-start justify-center gap-y-2">
                  <p className="font-IranYekanBold text-[2dvh] text-MainTextOne">
                    {profile?.first_name ? (
                      profile?.first_name
                    ) : self_profile?.first_name ? (
                      self_profile?.first_name
                    ) : (
                      <PulseLoading width="70px" height="2dvh" />
                    )}
                  </p>
                  <p className="font-IranYekanMedium text-[1.5dvh] text-MainTextTwo">{t('online')}</p>
                </div>
              </div>
              <div
                onClick={() => dispatch(addSlide('qrCodePage'))}
                className="flex h-[7dvh] w-[7dvh] cursor-pointer items-center justify-center rounded-full bg-MainBgTwo"
              >
                <Image width={55} height={55} className="h-[3.5dvh] w-[3.5dvh] object-contain" src={'/svg/Setting/barcode.svg'} alt="icon image" />
              </div>
            </div>
            <div
              className={`flex w-[90%] flex-col items-center justify-center gap-y-1 rounded-[20px] bg-MainBgOne px-3 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.3)] ${t('system_lang') === 'fa' ? 'rtl-custome' : 'ltr-custome'}`}
            >
              <div
                onClick={() => {
                  dispatch(addSlide('userAccount'));
                }}
                className="flex h-[8dvh] w-full cursor-pointer items-center justify-between bg-MainBgOne"
              >
                <div className="flex h-full items-center justify-center gap-x-3">
                  <Image
                    width={26}
                    height={26}
                    className="mb-[6px] object-contain md:h-[3.5dvh] md:w-[3.5dvh]"
                    src={'/svg/Setting/account.svg'}
                    alt="icon image"
                  />
                  <div className="flex flex-col items-start justify-center gap-y-2">
                    <p className="font-IranYekanBold text-[1.8dvh] text-MainTextOne md:text-[2dvh]">{t('user account')}</p>
                    <p className="font-IranYekanDemiBold text-[1.3dvh] text-MainTextTwo md:text-[1.5dvh]">{t('privacy, security, number change')}</p>
                  </div>
                </div>
                <Image
                  width={20}
                  height={20}
                  className={`h-[1.5dvh] w-[1.5dvh] object-contain md:h-[2dvh] md:w-[2dvh] ${localStorage.getItem('lang') === 'en' ? 'rotate-180' : 'rotate-0'}`}
                  src={'/svg/Setting/arrowLeftLittle.svg'}
                  alt="icon image"
                />
              </div>
              <div
                onClick={() => dispatch(addSlide('ChatSetting'))}
                className="flex h-[8dvh] w-full cursor-pointer items-center justify-between bg-MainBgOne"
              >
                <div className="flex h-full items-center justify-center gap-x-3">
                  <Image
                    width={26}
                    height={26}
                    className="mb-[6px] object-contain md:h-[3.5dvh] md:w-[3.5dvh]"
                    src={'/svg/Setting/chat.svg'}
                    alt="icon image"
                  />
                  <div className="flex flex-col items-start justify-center gap-y-2">
                    <p className="font-IranYekanBold text-[1.8dvh] text-MainTextOne md:text-[2dvh]">{t('chat')}</p>
                    <p className="font-IranYekanDemiBold text-[1.3dvh] text-MainTextTwo md:text-[1.5dvh]">
                      {t('application appearance, background, chat history')}
                    </p>
                  </div>
                </div>
                <Image
                  width={20}
                  height={20}
                  className={`h-[1.5dvh] w-[1.5dvh] object-contain md:h-[2dvh] md:w-[2dvh] ${localStorage.getItem('lang') === 'en' ? 'rotate-180' : 'rotate-0'}`}
                  src={'/svg/Setting/arrowLeftLittle.svg'}
                  alt="icon image"
                />
              </div>
              <div
                onClick={() => dispatch(addSlide('notifications'))}
                className="flex h-[8dvh] w-full cursor-pointer items-center justify-between bg-MainBgOne"
              >
                <div className="flex h-full items-center justify-center gap-x-3">
                  <Image
                    width={26}
                    height={26}
                    className="mb-[6px] object-contain md:h-[3.5dvh] md:w-[3.5dvh]"
                    src={'/svg/Setting/notif.svg'}
                    alt="icon image"
                  />
                  <div className="flex flex-col items-start justify-center gap-y-2">
                    <p className="font-IranYekanBold text-[1.8dvh] text-MainTextOne md:text-[2dvh]">{t('notifications')}</p>
                    <p className="font-IranYekanDemiBold text-[1.3dvh] text-MainTextTwo md:text-[1.5dvh]">{t('messages, groups and calls')}</p>
                  </div>
                </div>
                <Image
                  width={20}
                  height={20}
                  className={`h-[1.5dvh] w-[1.5dvh] object-contain md:h-[2dvh] md:w-[2dvh] ${localStorage.getItem('lang') === 'en' ? 'rotate-180' : 'rotate-0'}`}
                  src={'/svg/Setting/arrowLeftLittle.svg'}
                  alt="icon image"
                />
              </div>
              <div
                onClick={() => dispatch(addSlide('StorageSetting'))}
                className="flex h-[8dvh] w-full cursor-pointer items-center justify-between bg-MainBgOne"
              >
                <div className="flex h-full items-center justify-center gap-x-3">
                  <Image
                    width={26}
                    height={26}
                    className="mb-[6px] object-contain md:h-[3.5dvh] md:w-[3.5dvh]"
                    src={'/svg/Setting/net.svg'}
                    alt="icon image"
                  />
                  <div className="flex flex-col items-start justify-center gap-y-2">
                    <p className="font-IranYekanBold text-[1.8dvh] text-MainTextOne md:text-[2dvh]">{t('storage and the internet')}</p>
                    <p className="font-IranYekanDemiBold text-[1.3dvh] text-MainTextTwo md:text-[1.5dvh]">
                      {t('internet consumption, automatic download')}
                    </p>
                  </div>
                </div>
                <Image
                  width={20}
                  height={20}
                  className={`h-[1.5dvh] w-[1.5dvh] object-contain md:h-[2dvh] md:w-[2dvh] ${localStorage.getItem('lang') === 'en' ? 'rotate-180' : 'rotate-0'}`}
                  src={'/svg/Setting/arrowLeftLittle.svg'}
                  alt="icon image"
                />
              </div>
              <div onClick={() => handleLangFunc()} className="flex h-[8dvh] w-full cursor-pointer items-center justify-between bg-MainBgOne">
                <div className="flex h-full items-center justify-center gap-x-3">
                  <Image
                    width={26}
                    height={26}
                    className="mb-[6px] object-contain md:h-[3.5dvh] md:w-[3.5dvh]"
                    src={'/svg/Setting/lang.svg'}
                    alt="icon image"
                  />
                  <div className="flex flex-col items-start justify-center gap-y-2">
                    <p className="font-IranYekanBold text-[1.8dvh] text-MainTextOne md:text-[2dvh]">{t('language setting')}</p>
                    <p className="font-IranYekanDemiBold text-[1.3dvh] text-MainTextTwo md:text-[1.5dvh]">
                      {typeof window !== 'undefined' && localStorage.getItem('lang') === 'fa' ? 'فارسی' : 'english'}
                    </p>
                  </div>
                </div>
                <Image
                  width={20}
                  height={20}
                  className={`h-[1.5dvh] w-[1.5dvh] object-contain md:h-[2dvh] md:w-[2dvh] ${localStorage.getItem('lang') === 'en' ? 'rotate-180' : 'rotate-0'}`}
                  src={'/svg/Setting/arrowLeftLittle.svg'}
                  alt="icon image"
                />
              </div>
              <div
                onClick={() => setOpenSupportDialog(true)}
                className="flex h-[8dvh] w-full cursor-pointer items-center justify-between bg-MainBgOne"
              >
                <div className="flex h-full items-center justify-center gap-x-3">
                  <Image
                    width={26}
                    height={26}
                    className="mb-[6px] object-contain md:h-[3.5dvh] md:w-[3.5dvh]"
                    src={'/svg/Setting/backUp.svg'}
                    alt="icon image"
                  />
                  <div className="flex flex-col items-start justify-center gap-y-2">
                    <p className="font-IranYekanBold text-[1.8dvh] text-MainTextOne md:text-[2dvh]">{t('support')}</p>
                    <p className="font-IranYekanDemiBold text-[1.3dvh] text-MainTextTwo md:text-[1.5dvh]">{t('support center, contact us')}</p>
                  </div>
                </div>
                <Image
                  width={20}
                  height={20}
                  className={`h-[1.5dvh] w-[1.5dvh] object-contain md:h-[2dvh] md:w-[2dvh] ${localStorage.getItem('lang') === 'en' ? 'rotate-180' : 'rotate-0'}`}
                  src={'/svg/Setting/arrowLeftLittle.svg'}
                  alt="icon image"
                />
              </div>
              <div
                onClick={() => dispatch(addSlide('shareLinkPage'))}
                className="flex h-[8dvh] w-full cursor-pointer items-center justify-between bg-MainBgOne"
              >
                <div className="flex h-full items-center justify-center gap-x-3">
                  <Image
                    width={26}
                    height={26}
                    className="mb-[12px] object-contain md:h-[3.5dvh] md:w-[3.5dvh]"
                    src={'/svg/Setting/group.svg'}
                    alt="icon image"
                  />
                  <div className="flex flex-col items-start justify-center gap-y-2">
                    <p className="font-IranYekanBold text-[1.8dvh] text-MainTextOne md:text-[2dvh]">{t('invite friends')}</p>
                    <p className="font-IranYekanDemiBold text-[1.3dvh] text-MainTextTwo md:text-[1.5dvh]"></p>
                  </div>
                </div>
                <Image
                  width={20}
                  height={20}
                  className={`h-[1.5dvh] w-[1.5dvh] object-contain md:h-[2dvh] md:w-[2dvh] ${localStorage.getItem('lang') === 'en' ? 'rotate-180' : 'rotate-0'}`}
                  src={'/svg/Setting/arrowLeftLittle.svg'}
                  alt="icon image"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <p className="font-IranYekanDemiBold absolute bottom-5 flex w-full items-center justify-center text-[2dvh] text-[#A0BEB0]">Ver: 1.2.8</p>
      <SupportDialog open={openSupportDialog} setOpen={setOpenSupportDialog} />
      <LangDialog />
    </main>
  );
};

export default Index;
