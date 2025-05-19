'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import Image from 'next/image';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { EventIDs } from '@/Services/EventIDs';
import { useTranslation } from 'react-i18next';
import BackButton from '../BackButton/BackButton';
import useMediaItems from '@/utils/useMediaItems';
import PulseLoading from '../PulseLoading/Index';
import { Switch } from '@material-tailwind/react';
import { ContactValue } from '@/utils/useUserStatus';
import { addSlide } from '@/store/slices/ChangeSilde';
import { useDispatch, useSelector } from 'react-redux';
import { setNewProfile } from '@/store/slices/ProfileDialog';
import { setCallDialog } from '@/store/slices/CallDialogSlice';
import DeleteDialog from '@/components/Dialogs/DeleteItemDialog/Index';
import { Messages } from '@/store/slices/AccountInformationSlice';

// بخش اضافه کردن تایپ ها
interface AccountInfoType {
  accountInfo: {
    contactInfo: ContactValue[];
    user_messages: Messages[];
  };
}

const Index = ({ socket }: { socket: WebSocket }) => {
  // اضافه کردن state ها و سایر tools ها
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id: userParams } = useParams();
  const [blockUser, setBlockUser] = useState(false);
  const { contactInfo, user_messages } = useSelector((state: AccountInfoType) => state.accountInfo);
  const { imagesItem, videoItems } = useMediaItems(user_messages);
  // فیلتر کردن کاربر با params
  const [filterUserByParams] = contactInfo?.filter((item) => item.GUID === userParams);

  const handleBlockUser = () => {
    if (!socket) return;
    socket.send(JSON.stringify({ event: EventIDs.BLOCK, data: { user_id: filterUserByParams?.contact_id } }));
  };

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-start justify-center">
      <header className="mb-5 flex h-[8dvh] w-full items-center justify-end">
        <nav
          className={`relative flex w-full items-center justify-between px-5 ${localStorage.getItem('lang') === 'fa' ? 'ltr-custome' : 'rtl-custome'}`}
        >
          <BackButton />
          <div className="font-IranYekanBold absolute right-[50%] top-0 flex h-[145px] w-[145px] translate-x-[50%] items-center justify-center rounded-full bg-MainBgThree">
            <Image
              onClick={() => dispatch(setNewProfile(true))}
              width={125}
              height={125}
              className="h-[125px] w-[125px] cursor-pointer rounded-full object-cover object-top"
              src={'/svg/default_profile/user-profile.svg'}
              alt="icon image"
            />
          </div>
          <div className="flex w-[5rem] items-center justify-end gap-x-2"></div>
        </nav>
      </header>
      <section className="rtl-custome your-component-scrollbar flex h-[calc(100dvh-8dvh)] w-full flex-col items-center justify-start rounded-t-[30px] bg-MainBgOne">
        <div className="mt-24 flex h-[9dvh] min-h-[4.5rem] w-[90%] items-center justify-between rounded-[20px] bg-MainBgOne px-3 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
          <div className="flex h-full items-center justify-start">
            <div className="flex flex-col items-start justify-center gap-y-3">
              <p className="font-IranYekanBold text-[2dvh] text-MainTextOne">{filterUserByParams?.contact_name}</p>
              <p className="ltr-custome font-IranYekanMedium text-[1.8dvh] text-MainTextTwo">+{filterUserByParams?.contact_value}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-x-3">
            <div className="flex h-[6.5dvh] w-[6.5dvh] cursor-pointer items-center justify-center rounded-[15px] bg-MainBgTwo">
              <Image
                onClick={() => dispatch(setCallDialog(true))}
                width={30}
                height={30}
                className="h-[2.8dvh] w-[2.8dvh] object-contain"
                src={'/svg/homePage/Call/videoCall.svg'}
                alt="icon image"
              />
            </div>
            <div className="flex h-[6.5dvh] w-[6.5dvh] cursor-pointer items-center justify-center rounded-[15px] bg-MainBgTwo">
              <Image
                onClick={() => dispatch(setCallDialog(true))}
                width={30}
                height={30}
                className="h-[2.8dvh] w-[2.8dvh] object-contain text-[#38A271]"
                src={'/svg/homePage/Call/call.svg'}
                alt="icon image"
              />
            </div>
          </div>
        </div>
        <div className="mt-5 flex h-[17dvh] min-h-[9rem] w-[90%] flex-col items-center justify-between rounded-[20px] bg-MainBgOne px-3 pb-2 pt-4 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
          <div className="flex w-full items-center justify-between">
            <p onClick={() => dispatch(addSlide('docPage'))} className="font-IranYekanMedium cursor-pointer text-[1.5dvh] text-MainTextTwo">
              {t('images_links_and_documents')}
            </p>
            <div onClick={() => dispatch(addSlide('docPage'))} className="flex cursor-pointer items-center justify-center gap-x-1">
              <p className="font-IranYekanMedium -mb-1 text-[1.5dvh] text-MainTextTwo">15</p>
              <Image
                className="h-[1.5dvh] w-[1.5dvh] object-contain"
                width={10}
                height={10}
                src={'/svg/userInfo/leftLittleAngle.svg'}
                alt="angle icon"
              />
            </div>
          </div>
          <div
            onClick={() => dispatch(addSlide('docPage'))}
            className="your-component-scrollbarx flex w-full items-center justify-start gap-x-3 pb-2"
          >
            {imagesItem.length
              ? imagesItem.map((item) => (
                  <Image
                    key={item.url}
                    width={85}
                    height={85}
                    className="h-[10dvh] w-[10dvh] cursor-pointer rounded object-cover"
                    src={item.url}
                    alt="icon image"
                  />
                ))
              : Array.from({ length: 3 }).map((_, index) => <PulseLoading key={index} width="85px" height="10dvh" />)}
            {videoItems.map((item) => (
              <video
                key={item.url}
                width={85}
                height={85}
                className="pointer-events-none h-[10dvh] w-[10dvh] cursor-pointer rounded object-cover"
                src={item.url}
              />
            ))}
          </div>
        </div>
        <div className="mt-5 flex w-[90%] flex-col items-center justify-start gap-y-4 rounded-[20px] bg-MainBgOne p-5 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center justify-center gap-x-3">
              <Image width={30} height={30} className="h-[2.5dvh] w-[2.5dvh] object-contain" src={'/svg/userInfo/notif.svg'} alt="icon image" />
              <p className="font-IranYekanBold text-[1.7dvh] text-MainTextOne">{t('mute_notification')}</p>
            </div>
            <Switch
              className="h-full w-full checked:bg-[#2ec946]"
              containerProps={{
                className: 'w-11 h-6',
              }}
              circleProps={{
                className: 'before:hidden left-0.5 border-none',
              }}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <span className="h-[2px] w-full bg-[#C5E0D3]"></span>
          <div onClick={() => dispatch(addSlide('notifications'))} className="flex w-full cursor-pointer items-center justify-between">
            <div className="flex items-center justify-center gap-x-3">
              <Image width={30} height={30} className="h-[2.5dvh] w-[2.5dvh] object-contain" src={'/svg/userInfo/notifSound.svg'} alt="icon image" />
              <p className="font-IranYekanBold text-[1.7dvh] text-MainTextOne">{t('customize_notification')}</p>
            </div>
            <Image
              width={20}
              height={20}
              className="h-[1.5dvh] w-[1.5dvh] object-contain"
              src={'/svg/setting/arrowLeftLittle.svg'}
              alt="icon image"
            />
          </div>
        </div>
        <div className="mt-5 flex w-[90%] flex-col items-start justify-start gap-y-5 rounded-[20px] bg-MainBgOne px-5 py-7 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
          <p className="font-IranYekanBold text-[1.7dvh] text-MainTextTwo">{t('There is no common group')}</p>
          <div onClick={() => dispatch(addSlide('addNewGroup'))} className="flex w-full cursor-pointer items-center justify-between">
            <div className="flex items-center justify-center gap-x-2">
              <Image width={30} height={30} className="h-[2.5dvh] w-[2.5dvh] object-contain" src={'/svg/userInfo/group.svg'} alt="icon image" />
              <p className="font-IranYekanBold text-[1.7dvh] text-[#38A271]">
                {t('Building a group with')} {filterUserByParams?.contact_name}
              </p>
            </div>
            <Image width={20} height={20} className="h-[15px] w-[15px] object-contain" src={'/svg/setting/arrowLeftLittle.svg'} alt="icon image" />
          </div>
        </div>
        <div className="mt-5 flex w-[90%] flex-col items-center justify-start gap-y-4 rounded-[20px] bg-MainBgOne px-5 py-7 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
          <div onClick={() => setBlockUser(true)} className="flex w-full cursor-pointer items-center justify-start gap-x-3">
            <Image width={30} height={30} className="h-[2.5dvh] w-[2.5dvh] object-contain" src={'/svg/userInfo/block.svg'} alt="icon image" />
            <p className="font-IranYekanBold text-[1.5dvh] text-[#D92626]">
              {t('blockUser')} {filterUserByParams?.contact_name}
            </p>
          </div>
          <span className="h-[2px] w-full bg-[#C5E0D3]"></span>
          <div
            // onClick={() => {
            //   setBlockUser(true);
            // }}
            className="flex w-full cursor-pointer items-center justify-start gap-x-3"
          >
            <Image width={30} height={30} className="h-[2.5dvh] w-[2.5dvh] object-contain" src={'/svg/userInfo/flag.svg'} alt="icon image" />
            <p className="font-IranYekanBold text-[1.5dvh] text-[#D92626]">
              {t('reportUser')} {filterUserByParams?.contact_name}
            </p>
          </div>
        </div>
      </section>
      <DeleteDialog handleFunc={handleBlockUser} open={blockUser} setOpen={setBlockUser} text={t('toast_block_user')} />
    </div>
  );
};

export default Index;
