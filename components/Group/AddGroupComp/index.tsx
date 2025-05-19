'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useProfileImage from '@/utils/useProfileImage';
import { addSlide, handleBack } from '@/store/slices/ChangeSilde';

const Index = () => {
  // اضافه کردن state ها و سایر tools ها
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [step, setStep] = useState<boolean>(false);
  const { selectedImage, handleImageChange } = useProfileImage();

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-start bg-MainBgThree">
      <header className="flex h-[8dvh] w-full items-center justify-end">
        <nav className={`flex w-full items-center justify-between px-5 ${localStorage.getItem('lang') === 'fa' ? 'ltr-custome' : 'rtl-custome'}`}>
          <Image
            onClick={() => {
              !step ? dispatch(handleBack()) : setStep(false);
            }}
            width={35}
            height={35}
            className={`h-[2.5dvh] w-[2.5dvh] cursor-pointer object-contain ${localStorage.getItem('lang') === 'en' ? 'rotateYMenu justify-end' : 'justify-start'}`}
            src={'/svg/Setting/arrowLeft.svg'}
            alt="icon image"
          />
          <p className="font-IranYekanBold text-[16px] text-white">{step ? t('Add_group') : t('new_organization')}</p>
          {step ? (
            <Image
              onClick={() => dispatch(addSlide('groupSetting'))}
              className="cursor-pointer"
              width={30}
              height={30}
              alt=""
              src="svg/Setting/settingIcon.svg"
            />
          ) : (
            <span className="w-[35px]"></span>
          )}
        </nav>
      </header>
      <section
        className={`rtl-custome box-shadow relative flex h-[calc(100dvh-8dvh)] w-full items-start justify-center rounded-t-[30px] bg-MainBgOne pt-4`}
      >
        {!step ? (
          <div className="relative flex h-full w-full flex-col items-center justify-start gap-y-4">
            <div className="mt-[41px] flex w-full items-center justify-center">
              <div className="relative flex h-[132px] w-[132px] items-center justify-center rounded-full bg-MainBgTwo">
                <Image
                  width={60}
                  height={60}
                  className="h-full w-full rounded-full object-cover object-top"
                  src={selectedImage}
                  alt="new group icon"
                />
                <label className="absolute bottom-0 right-0 flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full border border-[#EFF8F4] bg-MainBgThree">
                  <input
                    className="absolute right-0 top-0 z-30 h-full w-full bg-transparent"
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <Image src={'/svg/newGroup/camera.svg'} className="h-[19px] w-[23px] object-contain" width={23} height={19} alt="camera icon" />
                </label>
              </div>
            </div>
            <div className="mt-10 flex h-[270px] w-[90%] flex-col items-center justify-center gap-y-5 rounded-2xl bg-MainBgTwo p-4">
              <input
                placeholder={t('organization_name')}
                className="placeholder:font-IranYekanBold w-full border-b border-[#A0BEB0] bg-MainBgTwo p-3 outline-none placeholder:text-[#A0BEB0]"
                type="text"
              />
              <textarea
                rows={7}
                className="placeholder:font-IranYekanBold w-full resize-none rounded-lg border-b border-[#A0BEB0] bg-MainBgOne p-3 outline-none placeholder:text-[#A0BEB0]"
                placeholder={t('organization_description')}
              />
            </div>
            <div
              onClick={() => setStep(true)}
              className="shadoow-3D absolute bottom-5 right-3 flex h-[60px] w-[127px] cursor-pointer items-center justify-start gap-x-2 rounded-2xl bg-MainBgThree pr-3 transition-all duration-200 hover:bg-[#30865e]"
            >
              <Image
                width={30}
                height={30}
                className="-mb-1 h-[30px] w-[30px] object-contain"
                src={'/svg/newGroup/nextArrow.svg'}
                alt="next arrow Icon"
              />
              <p className="font-IranYekanDemiBold text-white">{t('next')}</p>
            </div>
          </div>
        ) : (
          step && (
            <div className="relative flex h-full w-full flex-col items-center justify-start gap-y-4">
              <div className="flex w-[90%] flex-col items-center justify-center gap-y-3">
                <div
                  onClick={() => dispatch(addSlide('addNewGroup'))}
                  className={`flex w-full cursor-pointer items-center justify-start gap-x-3 rounded-3xl bg-MainBgTwo p-3 ${localStorage.getItem('lang') === 'fa' ? 'rtl-custome' : 'ltr-custome'}`}
                >
                  <div className="flex h-[55px] w-[55px] items-center justify-center rounded-full bg-MainBgThree">
                    <Image className="h-[26px] w-[26px] object-contain" src={'/svg/newGroup/addGroup.svg'} width={26} height={26} alt="add person" />
                  </div>
                  <p className="font-IranYekanMedium text-MainTextOne">{t('create_new_group')}</p>
                </div>
                <div
                  onClick={() => toast.warning(t('Unfortunately, no group found!'))}
                  className={`flex w-full cursor-pointer items-center justify-start gap-x-3 rounded-3xl bg-MainBgTwo p-3 ${localStorage.getItem('lang') === 'fa' ? 'rtl-custome' : 'ltr-custome'}`}
                >
                  <div className="flex h-[55px] w-[55px] items-center justify-center rounded-full bg-MainBgThree">
                    <Image className="h-[26px] w-[26px] object-contain" src={'/svg/newGroup/addIcon.svg'} width={26} height={26} alt="add person" />
                  </div>
                  <p className="font-IranYekanMedium text-MainTextOne">{t('add_from_existing_groups')}</p>
                </div>
              </div>
              <div
                className={`mt-5 flex w-[90%] flex-col items-center justify-center ${localStorage.getItem('lang') === 'fa' ? 'rtl-custome' : 'ltr-custome'}`}
              >
                <h3 className="font-IranYekanDemiBold flex w-full items-center justify-start text-[15px] text-MainTextTwo">
                  {t('groups_in_this_organization')}
                </h3>
                <div className="flex w-full flex-col items-start justify-center">
                  <div className="mt-5 flex items-center justify-center gap-x-3">
                    <Image
                      className="h-[56px] w-[56px] rounded-full object-cover object-top"
                      src={'/svg/default_profile/user-profile.svg'}
                      width={56}
                      height={56}
                      alt="group image"
                    />
                    <div className="flex flex-col items-center justify-center gap-y-3">
                      <p className="font-IranYekanDemiBold flex w-full items-center justify-start text-MainTextOne">{t('first_group_name')}</p>
                      <p className="font-IranYekanDemiBold flex w-full items-center justify-start text-[14px] text-MainTextTwo">
                        {t('public_group')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </section>
    </div>
  );
};

export default Index;
