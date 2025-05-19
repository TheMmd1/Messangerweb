'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import Image from 'next/image';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { changeTheme } from '@/utils/themeHelper';
import { useDispatch, useSelector } from 'react-redux';
import { addSlide } from '@/store/slices/ChangeSilde';
import { Profile } from '@/store/slices/AccountInformationSlice';
import { setNewHambergerStatus } from '@/store/slices/HambergerMenuSlice';

// بخش اضافه کردن تایپ ها
interface HambergerMenu {
  hambergerMenu: boolean;
}

const Index = () => {
  // اضافه کردن state ها و سایر tools ها
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [reRender, setReRender] = useState<boolean>(false);
  const open = useSelector((state: HambergerMenu) => state.hambergerMenu);
  const [backgroundStatus, setBackgroundStatus] = useState<boolean>(false);
  const { profile, self_profile } = useSelector((state: { accountInfo: { profile: Profile; self_profile: Profile } }) => state.accountInfo);

  // بررسی تم برنامه و تغییر آیکون روشن و خاموش
  useEffect(() => {
    if (Cookies.get('theme') === 'light') {
      setBackgroundStatus(true);
    } else {
      setBackgroundStatus(false);
    }
  }, [reRender]);

  // تابع تفییر تم برنامه
  const themeHandler = () => {
    setReRender(!reRender);
    if (Cookies.get('theme')) {
      if (Cookies.get('theme') === '') {
        Cookies.set('theme', 'dark', { expires: 30 });
        changeTheme('dark');
      } else if (Cookies.get('theme') === 'light') {
        changeTheme('dark');
        Cookies.set('theme', 'dark', { expires: 30 });
      } else if (Cookies.get('theme') === 'dark') {
        changeTheme('light');
        Cookies.set('theme', 'light', { expires: 30 });
      }
    } else {
      Cookies.set('theme', 'dark', { expires: 30 });
      changeTheme('dark');
    }
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 top-0 transition-all duration-300 ${open ? 'z-[999] opacity-100' : '-z-[999] opacity-0'}`}>
      <div onClick={() => dispatch(setNewHambergerStatus(false))} className="blur-menu absolute bottom-0 left-0 right-0 top-0 -z-10"></div>
      <div
        className={`fixed bottom-5 ${t('system_lang') === 'fa' ? 'rtl-custome left-7' : 'ltr-custome right-7'} top-5 flex w-[18rem] flex-col items-center justify-start rounded-[30px] bg-MainBgOne p-5 transition-all duration-500 sm:w-[19rem] ${
          open ? 'm-0' : `${t('system_lang') === 'fa' ? '-ml-[20rem]' : '-mr-[20rem]'}`
        }`}
      >
        <div className="flex w-full flex-col items-center justify-center gap-y-2">
          <div className={`h-[7.5dvh] w-full rounded-[15px] bg-MainBgThree px-3`}>
            <div className="flex h-full w-full items-center justify-between rounded-3xl">
              <div className="flex items-center justify-center gap-x-3">
                <Image
                  width={50}
                  height={50}
                  className="h-[6dvh] w-[6dvh] rounded-full border border-[#F6F6F6] object-cover object-top"
                  src="/svg/default_profile/user-profile.svg"
                  alt="icon image"
                />
                {/* title section */}
                <div className="flex flex-col items-start justify-center gap-y-2">
                  <p className="font-IranYekanBold text-[1.7dvh] text-white">
                    {profile?.first_name ? profile?.first_name : self_profile?.first_name ? self_profile?.first_name : t('loading')}
                  </p>
                  <p className="text-[1.55dvh] font-[400] text-white">{self_profile?.phone_number ? self_profile?.phone_number : t('loading')}</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                {false && (
                  <span className="flex h-[3dvh] w-[3dvh] items-center justify-center rounded-full bg-MainBgOne text-[1.5dvh] text-[#38A271]">2</span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* options */}
        <div className={`mt-2 flex w-full flex-col items-center justify-center gap-y-1 text-textChat`}>
          <div
            onClick={() => router.push('/')}
            className="flex h-[7.5dvh] w-full cursor-pointer items-center justify-start gap-x-3 border-b border-[#C5E0D3] px-3"
          >
            <Image
              src={'/svg/homePage/HambergerMenu/addIcon.svg'}
              className="h-[3dvh] w-[3dvh] object-contain"
              width={26}
              height={26}
              alt="add accout logo"
            />
            <p className="font-IranYekanDemiBold text-[1.7dvh]">{t('add new account')}</p>
          </div>
          <div
            onClick={() => {
              dispatch(setNewHambergerStatus(false));
              dispatch(addSlide('addNewGroup'));
            }}
            className="flex h-[7.5dvh] w-full cursor-pointer items-center justify-start gap-x-3 border-b border-[#C5E0D3] px-3"
          >
            <Image
              src={'/svg/homePage/HambergerMenu/newGroupIcon.svg'}
              className="h-[3dvh] w-[3dvh] object-contain"
              width={26}
              height={26}
              alt="add accout logo"
            />
            <p className="font-IranYekanDemiBold text-[1.7dvh]">{t('new group')}</p>
          </div>
          <div
            onClick={() => {
              dispatch(setNewHambergerStatus(false));
              dispatch(addSlide('channelSetting'));
            }}
            className="flex h-[7.5dvh] w-full cursor-pointer items-center justify-start gap-x-3 border-b border-[#C5E0D3] px-3"
          >
            <Image src={'/svg/channel/speaker_icon.svg'} className="h-[3dvh] w-[3dvh] object-contain" width={26} height={26} alt="add accout logo" />
            <p className="font-IranYekanDemiBold text-[1.7dvh]">{t('new Channel')}</p>
          </div>
          {/* toast updated */}
          <div
            onClick={() => {
              toast.warning(localStorage.getItem('lang') === 'fa' ? 'شما هیچ پیام ذخیره شده ای ندارید.' : 'no saved message found', {
                style: {
                  margin: 'auto',
                  marginTop: '21px ',
                },
              });
            }}
            className="flex h-[7.5dvh] w-full cursor-pointer items-center justify-start gap-x-3 border-b border-[#C5E0D3] px-3"
          >
            <Image
              src={'/svg/homePage/HambergerMenu/markedMessageIcon.svg'}
              className="h-[3dvh] w-[3dvh] object-contain"
              width={26}
              height={26}
              alt="add accout logo"
            />
            <p className="font-IranYekanDemiBold text-[1.7dvh]">{t('Starred messages')}</p>
          </div>
          <div
            onClick={() => {
              dispatch(addSlide('settingPage'));
              dispatch(setNewHambergerStatus(false));
            }}
            className="flex h-[7.5dvh] w-full cursor-pointer items-center justify-start gap-x-3 px-3"
          >
            <Image
              src={'/svg/homePage/HambergerMenu/settingIcon.svg'}
              className="h-[3dvh] w-[3dvh] object-contain"
              width={26}
              height={26}
              alt="add accout logo"
            />
            <p className="font-IranYekanDemiBold text-[1.7dvh]">{t('setting')}</p>
          </div>
        </div>
        {/* version and theme icon */}
        <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
          <span onClick={themeHandler} className="flex h-[7dvh] w-[7dvh] cursor-pointer items-center justify-center rounded-full bg-MainBgThree">
            <Image
              src={backgroundStatus ? '/svg/homePage/HambergerMenu/themeIcon.svg' : '/svg/homePage/HambergerMenu/sun.svg'}
              className="h-[2.5dvh] w-[2.5dvh] object-contain"
              width={18}
              height={18}
              alt="theme logo"
            />
          </span>
          <p className="text-[2dvh] text-[#A0BEB0]">Ver: 1.2.8</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
