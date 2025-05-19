'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import DeleteDialog from '../../Dialogs/DeleteItemDialog/Index';
import useProfileImage from '@/utils/useProfileImage';
import { useState } from 'react';
import { addSlide, handleBack } from '@/store/slices/ChangeSilde';
import { useTranslation } from 'react-i18next';

const Index = () => {
  // اضافه کردن state ها و سایر tools ها
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { selectedImage, handleImageChange } = useProfileImage();
  const [deleteChannelDialog, setDeleteChannelDialog] = useState(false);

  return (
    <div className="rtl-custome flex min-h-[100dvh] w-full flex-col items-center justify-start bg-MainBgThree">
      <header className="flex h-[8dvh] w-full items-center justify-end">
        <nav className={`flex w-full items-center justify-between px-5 ${localStorage.getItem('lang') === 'fa' ? 'rtl-custome' : 'ltr-custome'}`}>
          <span className="w-[35px]"></span>
          <p className="font-IranYekanBold text-[2dvh] text-white">{t('edit')}</p>
          <Image
            onClick={() => dispatch(handleBack())}
            width={35}
            height={35}
            className={`h-[2.5dvh] w-[2.5dvh] cursor-pointer object-contain ${localStorage.getItem('lang') === 'en' && 'rotateYMenu'}`}
            src={'/svg/Setting/arrowLeft.svg'}
            alt="icon image"
          />
        </nav>
      </header>
      <section className="box-shadow relative flex h-[calc(100dvh-8dvh)] w-full flex-col items-center justify-center rounded-t-[30px] bg-MainBgTwo p-4">
        <div className="your-component-scrollbar relative mb-7 flex w-full flex-1 flex-col items-center justify-start gap-y-5">
          <div className="flex w-full flex-col items-center justify-start gap-y-3 rounded-[20px] bg-MainBgOne px-7 pb-9 pt-6 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.1)]">
            <div className="flex w-full items-center justify-center gap-x-3">
              <label className="relative flex h-[60px] w-[60px] cursor-pointer items-center justify-center">
                <Image
                  width={60}
                  height={60}
                  className="aspect-square h-full w-full rounded-full object-cover object-top"
                  src={selectedImage}
                  alt="icon image"
                />
                <input className="h-full w-full" hidden type="file" accept="image/*" onChange={handleImageChange} />
                <div className="absolute -bottom-1 -left-1 flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full border border-white bg-MainBgThree">
                  <Image width={15} height={15} className="h-[13px] w-[15px] object-contain" src={'/svg/channel/camera.svg'} alt="icon image" />
                </div>
              </label>
              <input
                placeholder={t('channel_name')}
                className="placeholder:font-IranYekanBold w-[calc(100%-55px)] border-b border-[#A0BEB0] py-3 pl-5 pr-3 outline-none placeholder:text-MainTextOne"
                type="text"
              />
            </div>
            <input
              placeholder={t('Description_optional')}
              className="placeholder:font-IranYekanBold w-full border-b border-[#A0BEB0] py-3 pl-5 pr-3 outline-none placeholder:text-[#A0BEB0]"
              type="text"
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center rounded-[20px] bg-MainBgOne px-3 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
            <div className="flex w-full flex-col items-center justify-start gap-y-5 p-5">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center justify-center gap-x-3">
                  <Image
                    className="h-[23px] w-[23px] object-contain"
                    width={23}
                    height={23}
                    src={'/svg/channel/speaker_icon.svg'}
                    alt="channel icon"
                  />
                  <p className="font-IranYekanMedium text-[16px] text-MainTextOne md:text-[18px]">{t('channel_type')}</p>
                </div>
                <p className="font-IranYekanMedium flex items-center justify-center text-[#38A271]">{t('public_channel')}</p>
              </div>
              <span className="h-[2px] w-full bg-[#C5E0D3]"></span>
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center justify-center gap-x-3">
                  <Image
                    className="h-[22px] w-[22px] object-contain"
                    width={23}
                    height={23}
                    src={'/svg/channel/message_icon.svg'}
                    alt="message icon"
                  />
                  <p className="font-IranYekanMedium text-[16px] text-MainTextOne md:text-[18px]">{t('comments_on_channel')}</p>
                </div>
                <p className="font-IranYekanMedium flex items-center justify-center text-[#38A271]">{t('add')}</p>
              </div>
              <span className="h-[2px] w-full bg-[#C5E0D3]"></span>
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center justify-center gap-x-3">
                  <Image className="h-[23px] w-[23px] object-contain" width={23} height={23} src={'/svg/channel/like_icon.svg'} alt="like icon" />
                  <p className="font-IranYekanMedium text-[16px] text-MainTextOne md:text-[18px]">{t('reaction')}</p>
                </div>
                <p className="font-IranYekanMedium flex items-center justify-center text-[#38A271]">{t('all')}</p>
              </div>
              <span className="h-[2px] w-full bg-[#C5E0D3]"></span>
              <div onClick={() => dispatch(addSlide('channelAdminSetting'))} className="flex w-full cursor-pointer items-center justify-between">
                <div className="flex items-center justify-center gap-x-3">
                  <Image className="h-[23px] w-[23px] object-contain" width={23} height={23} src={'/svg/channel/star_icon.svg'} alt="start icon" />
                  <p className="font-IranYekanMedium text-[16px] text-MainTextOne md:text-[18px]">{t('admins')}</p>
                </div>
                <p className="font-IranYekanMedium flex items-center justify-center text-[#38A271]">۳</p>
              </div>
              <span className="h-[2px] w-full bg-[#C5E0D3]"></span>
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center justify-center gap-x-3">
                  <Image
                    className="h-[23px] w-[23px] object-contain"
                    width={23}
                    height={23}
                    src={'/svg/channel/members_icon.svg'}
                    alt="members icon"
                  />
                  <p className="font-IranYekanMedium text-[16px] text-MainTextOne md:text-[18px]">{t('members')}</p>
                </div>
                <p className="font-IranYekanMedium flex items-center justify-center text-[#38A271]">{/* اینجا بعدا به صورت داینامیک میاد */}</p>
              </div>
              <span className="h-[2px] w-full bg-[#C5E0D3]"></span>
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center justify-center gap-x-3">
                  <Image
                    className="h-[23px] w-[23px] object-contain"
                    width={23}
                    height={23}
                    src={'/svg/channel/report_icon.svg'}
                    alt="garbage icon"
                  />
                  <p className="font-IranYekanMedium text-[16px] text-MainTextOne md:text-[18px]">{t('deleted_member')}</p>
                </div>
                <p className="font-IranYekanMedium flex items-center justify-center text-[#38A271]">۶۵</p>
              </div>
            </div>
          </div>
          <div
            onClick={() => setDeleteChannelDialog(true)}
            className="flex w-full cursor-pointer items-center justify-start gap-x-3 rounded-[20px] bg-MainBgOne px-7 py-5 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]"
          >
            <Image
              className="h-[23px] w-[23px] object-contain text-[#D92626]"
              width={23}
              height={23}
              src={'/svg/channel/red_garbage_icon.svg'}
              alt="garbage icon"
            />
            <p className="font-IranYekanBold text-[16px] text-[#D92626] md:text-[18px]">{t('deleteChannel')}</p>
          </div>
        </div>
        {/* fixed button */}
        <div
          onClick={() => dispatch(handleBack())}
          className="shadoow-3D flex h-[55px] cursor-pointer items-center justify-start gap-x-2 self-start rounded-2xl bg-MainBgThree pl-8 pr-3 transition-all duration-200 hover:bg-[#4eb887]"
        >
          <Image width={30} height={30} className="-mb-1 h-[4dvh] w-[4dvh] object-contain" src={'/svg/channel/tik.svg'} alt="next arrow Icon" />
          <p className="font-IranYekanDemiBold text-[2dvh] text-white">{t('save')}</p>
        </div>
      </section>
      <DeleteDialog open={deleteChannelDialog} setOpen={setDeleteChannelDialog} text={t('do_you_want_to_delete_this_channel')} />
    </div>
  );
};

export default Index;
