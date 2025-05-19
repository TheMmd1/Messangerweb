'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ConfirmBtn from '../ConfrimBtn/Index';
import { useTranslation } from 'react-i18next';
import { EventIDs } from '@/Services/EventIDs';
import PulseLoading from '../PulseLoading/Index';
import BackButton from '../BackButton/BackButton';
import useProfileImage from '@/utils/useProfileImage';
import { useDispatch, useSelector } from 'react-redux';
import { addSlide, handleBack } from '@/store/slices/ChangeSilde';
import { Profile, setProfileData } from '@/store/slices/AccountInformationSlice';

function Index({ socket }: { socket: WebSocket }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isBioEdit, setIsBioEdit] = useState(false);
  const [isNameEdit, setIsNameEdit] = useState(false);
  const [bioValue, setBioValue] = useState<string | null>(null);
  const [nameValue, setNameValue] = useState<string | null>(null);
  const { selectedImage, handleImageChange } = useProfileImage();
  const { profile, self_profile } = useSelector((state: { accountInfo: { profile: Profile; self_profile: Profile } }) => state.accountInfo);

  const nameRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);

  // Close name input on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isNameEdit && nameRef.current && !nameRef.current.contains(event.target as Node)) {
        setIsNameEdit(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNameEdit]);

  // Close bio input on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isBioEdit && bioRef.current && !bioRef.current.contains(event.target as Node)) {
        setIsBioEdit(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isBioEdit]);

  const handleUpdateInfo = () => {
    if (socket) {
      socket.send(
        JSON.stringify({
          event: EventIDs.UPDATE_PROFILE,
          data: {
            first_name: nameValue || profile.first_name,
            bio: bioValue || profile.bio,
          },
        })
      );
    }
    dispatch(handleBack());
    dispatch(
      setProfileData({
        first_name: nameValue || profile.first_name,
        bio: bioValue || profile.bio,
      })
    );
  };

  return (
    <div className="flex h-[100dvh] w-full flex-col items-start justify-center">
      <header className="mb-5 flex h-[8dvh] w-full items-center justify-end">
        <nav
          className={`relative flex w-full items-center justify-between px-5 ${
            localStorage.getItem('lang') === 'fa' ? 'ltr-custome' : 'rtl-custome'
          }`}
        >
          <BackButton />
          <div className="font-IranYekanBold absolute right-[50%] top-0 flex h-[17dvh] w-[17dvh] translate-x-[50%] items-center justify-center rounded-full bg-MainBgThree md:h-[20dvh] md:w-[20dvh] lg:max-h-[140px] lg:max-w-[140px]">
            <Image
              width={125}
              height={125}
              className="h-[18dvh] w-[18dvh] cursor-pointer rounded-full object-cover object-top lg:max-h-[125px] lg:max-w-[125px]"
              src={selectedImage}
              alt="icon image"
            />
            <label className="absolute bottom-0 right-0 flex h-[5.7dvh] w-[5.7dvh] cursor-pointer items-center justify-center rounded-full border-[3px] border-MainBgTwo bg-MainBgThree">
              <input className="h-full w-full" hidden type="file" accept="image/*" onChange={handleImageChange} />
              <Image width={20} height={20} alt="" src="/svg/homePage/NewAccount/Path 54014.svg" />
            </label>
          </div>
          <div className="flex w-[5rem] items-center justify-end gap-x-2"></div>
        </nav>
      </header>

      <section
        className={`your-component-scrollbar mt-[20px] flex h-[calc(100dvh-8dvh)] w-full flex-col items-center justify-start gap-[15px] rounded-t-[30px] bg-MainBgTwo px-[15px] md:px-[25px] ${
          t('system_lang') === 'fa' ? 'rtl-custome' : 'ltr-custome'
        }`}
      >
        {/* Name Field */}
        <div
          ref={nameRef}
          className="relative mt-24 flex h-[7dvh] w-full cursor-pointer items-center justify-start gap-x-[2px] rounded-[1.2rem] bg-MainBgOne px-[8px] py-[2.3rem] shadow-[0_1px_5px_#00000024] md:h-[9dvh] md:gap-x-3"
        >
          <div className="flex h-[6dvh] w-[6dvh] items-center justify-center rounded-[20px] bg-MainBgTwo md:h-[7dvh] md:w-[7dvh]">
            <Image className="h-[40%] w-[40%] object-contain" src="/svg/homePage/NewAccount/Path 54142.svg" width={30} height={30} alt="edit icon" />
          </div>
          <div>
            <p className="font-IranYekanRegular mb-[10px] text-[1.5dvh] text-[#606060] md:text-[2dvh]">{t('your_name')}</p>
            {isNameEdit ? (
              <input
                autoFocus
                onChange={(e) => setNameValue(e.target.value)}
                type="text"
                className="w-full border-b px-5 pb-1 text-[1.5dvh] outline-none md:text-[1.8dvh]"
              />
            ) : (
              <p className="font-IranYekanBold text-[1.3dvh] text-MainTextOne md:text-[1.8dvh]">
                {profile?.first_name || self_profile?.first_name || <PulseLoading width="10dvh" height="2dvh" />}
              </p>
            )}
          </div>
          <Image
            onClick={() => setIsNameEdit(!isNameEdit)}
            className={`absolute bottom-5 h-[2.4dvh] w-[2.4dvh] cursor-pointer md:bottom-7 ${t('system_lang') === 'fa' ? 'left-5' : 'right-5'}`}
            width={20}
            height={20}
            alt=""
            src="/svg/homePage/NewAccount/Path 54141.svg"
          />
        </div>

        {/* Bio Field */}
        <div
          ref={bioRef}
          className="relative flex h-[7dvh] w-full cursor-pointer items-center justify-start gap-x-[2px] rounded-[1.2rem] bg-MainBgOne px-[8px] py-[2.3rem] shadow-[0_1px_5px_#00000024] md:h-[9dvh] md:gap-x-3"
        >
          <div className="flex h-[6dvh] w-[6dvh] items-center justify-center rounded-[20px] bg-MainBgTwo md:h-[7dvh] md:w-[7dvh]">
            <Image className="h-[40%] w-[40%] object-contain" src="/svg/homePage/NewAccount/Path 54145.svg" width={30} height={30} alt="edit icon" />
          </div>
          <div>
            <p className="font-IranYekanRegular mb-[10px] text-[1.5dvh] text-[#606060] md:text-[2dvh]">{t('about_me')}</p>
            {isBioEdit ? (
              <input
                autoFocus
                onChange={(e) => setBioValue(e.target.value)}
                type="text"
                className="w-full border-b px-5 pb-1 text-[1.5dvh] outline-none md:text-[1.8dvh]"
              />
            ) : (
              <p className="font-IranYekanBold text-[1.3dvh] text-MainTextOne md:text-[1.8dvh]">
                {profile?.bio || self_profile?.bio || <PulseLoading width="15dvh" height="2dvh" />}
              </p>
            )}
          </div>
          <Image
            onClick={() => setIsBioEdit(!isBioEdit)}
            className={`md:w-[2.6dvh ] absolute bottom-5 h-[2.4dvh] w-[2.4dvh] cursor-pointer md:bottom-7 md:h-[2.6dvh] ${t('system_lang') === 'fa' ? 'left-5' : 'right-5'}`}
            width={20}
            height={20}
            alt=""
            src="/svg/homePage/NewAccount/Path 54141.svg"
          />
        </div>

        {/* Phone & Password Section */}
        <div className="relative flex h-[7dvh] w-full items-center gap-x-[2px] rounded-[1.2rem] bg-MainBgOne px-[8px] py-[2.3rem] shadow-[0_1px_5px_#00000024] md:h-[9dvh] md:gap-x-3">
          <div className="flex h-[6dvh] w-[6dvh] items-center justify-center rounded-[20px] bg-MainBgTwo md:h-[7dvh] md:w-[7dvh]">
            <Image className="h-[40%] w-[40%] object-contain" src="/svg/homePage/NewAccount/Path 54146.svg" width={30} height={30} alt="phone icon" />
          </div>
          <div>
            <p className="font-IranYekanRegular mb-[10px] text-[1.5dvh] text-[#606060] md:text-[2dvh]">{t('Phone Number')}</p>
            <p className="font-IranYekanBold text-[1.3dvh] text-MainTextOne md:text-[1.8dvh]">09037180223</p>
          </div>
        </div>

        <div
          onClick={() => dispatch(addSlide('createPass'))}
          className="relative flex h-[7dvh] w-full cursor-pointer items-center gap-x-[2px] rounded-[1.2rem] bg-MainBgOne px-[8px] py-[2.3rem] shadow-[0_1px_5px_#00000024] md:h-[9dvh] md:gap-x-3"
        >
          <div className="flex h-[6dvh] w-[6dvh] items-center justify-center rounded-[20px] bg-MainBgTwo md:h-[7dvh] md:w-[7dvh]">
            <Image className="h-[50%] w-[50%] object-contain" src="/svg/homePage/NewAccount/Path 54150.svg" width={30} height={30} alt="lock icon" />
          </div>
          <p className="font-IranYekanMedium text-[1.5dvh] md:text-[2dvh]">{t('create_password')}</p>
        </div>
      </section>

      <ConfirmBtn onClickFunc={handleUpdateInfo} text={t('confirm')} />
    </div>
  );
}

export default Index;
