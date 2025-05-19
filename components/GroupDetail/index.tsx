import React from 'react'
import BackButton from '../BackButton/BackButton';
import Image from 'next/image';
import { addSlide } from '@/store/slices/ChangeSilde';
import { useDispatch, useSelector } from 'react-redux';
import i18n from '@/i18n';
import { RootState } from '@/store/store';
import { Menu, MenuHandler, MenuList, MenuItem, IconButton } from '@material-tailwind/react';
import { leaveGroup } from '@/store/slices/GroupSlice';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import LastSeen from '@/components/LastSeenCompo/Index';



const Index = ({ socket }: { socket: WebSocket }) => {
  const { t } = i18n;
  const dispatch = useDispatch();
  const selectedGroup = useSelector((state: RootState) => state.groups.selectedGroup);

  const [openLeaveModal, setOpenLeaveModal] = React.useState(false);

  const handleOpenLeaveModal = () => setOpenLeaveModal(!openLeaveModal);

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-start justify-start">
      <header className="flex h-[8dvh] w-full items-center justify-between">
        <Menu placement="bottom-end">
          <MenuHandler>
            <IconButton variant="text" className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="19" r="2" />
              </svg>
            </IconButton>
          </MenuHandler>
          <MenuList>
            <MenuItem
              className="font-IranYekanMedium cursor-pointer text-[1.5dvh] text-MainTextTwo"
              onClick={() => dispatch(addSlide('EditGroupDetail'))}
            >
              {t('editGroupInfo')}
            </MenuItem>
            <MenuItem className="font-IranYekanMedium cursor-pointer text-[1.5dvh] text-MainTextTwo">{t('muteNotification')}</MenuItem>
            <MenuItem className="font-IranYekanMedium cursor-pointer text-[1.5dvh] text-MainTextTwo">{t('addToFavorites')}</MenuItem>
            <MenuItem className="font-IranYekanMedium cursor-pointer text-[1.5dvh] text-MainTextTwo" onClick={handleOpenLeaveModal}>
              {t('exitGroup')}
            </MenuItem>

            {/* <MenuItem
              className="font-IranYekanMedium cursor-pointer text-[1.5dvh] text-MainTextTwo"
              onClick={() => {
                if (window.confirm(t('confirm_exit_group') || 'Are you sure you want to leave the group?')) {
                  dispatch(leaveGroup({ groupId: selectedGroup.id }));
                  dispatch(addSlide('GroupListComp')); // Or redirect as needed
                }
              }}
            >
              {t('exitGroup')}
            </MenuItem> */}
          </MenuList>
        </Menu>

        <Dialog open={openLeaveModal} handler={handleOpenLeaveModal}>
          <DialogHeader>{t('LeaveGroup')}</DialogHeader>
          <DialogBody className="text-[1.5dvh] text-MainTextTwo">{t('leaveGroup') || 'Are you sure you want to leave this group?'}</DialogBody>
          <DialogFooter>
            <Button variant="text" color="gray" onClick={handleOpenLeaveModal} className="mr-2 text-[1.2dvh] text-MainTextTwo">
              <span>{t('cancel') || 'Cancel'}</span>
            </Button>
            <Button
              variant="gradient"
              color="red"
              onClick={() => {
                dispatch(leaveGroup({ groupId: selectedGroup.id }));
                dispatch(addSlide('GroupListComp'));
                handleOpenLeaveModal();
              }}
            >
              <span className="text-[1.2dvh] text-MainTextTwo text-white">{t('LeaveGroup')}</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <p className="font-IranYekanMedium cursor-pointer pl-3 text-[1.8dvh] text-MainTextTwo text-white">{t('GroupInfo')}</p>
        <div
          onClick={() => dispatch(addSlide('GroupListComp'))}
          className={`flex w-[35px] items-center ${t('system_lang') === 'en' ? 'rotateYMenu justify-end' : 'justify-start'}`}
        >
          <Image
            width={35}
            height={30}
            className="h-[2.5dvh] w-[2.5dvh] cursor-pointer object-contain pl-1"
            src={'/svg/Setting/arrowLeft.svg'}
            alt="icon image"
          />
        </div>
      </header>
      <div className="rtl-custome your-component-scrollbar flex h-[calc(100dvh-8dvh)] w-full flex-col items-center justify-start rounded-t-[30px] bg-MainBgOne">
        <div className="item-center mt-5 flex h-auto w-[90%] flex-col items-center justify-center rounded-[20px] bg-MainBgOne p-5 px-3 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
          {selectedGroup?.image ? (
            <Image src={selectedGroup?.image} alt="Description" width={200} height={200} className="rounded-full" />
          ) : selectedGroup?.image === '' ? (
            <div className="font-IranYekanBold flex h-[17dvh] w-[17dvh] items-center justify-center rounded-full bg-MainBgThree p-0">
              <Image
                // onClick={() => dispatch(setNewProfile(true))}
                width={125}
                height={125}
                className="h-[137px] w-[230px] cursor-pointer rounded-full object-contain object-top pb-[10px]"
                src="/svg/homePage/HambergerMenu/newGroupIcon.svg"
                alt="icon image"
              />
            </div>
          ) : null}
          <h1 className="font-IranYekanBold mt-5 text-center text-[2.5dvh] text-MainTextOne text-black">{selectedGroup?.name}</h1>
          <p className="font-IranYekanMedium -mb-1 mt-1 text-center text-[1.5dvh] text-MainTextTwo">
            {t('grpDetail.grpDetailLeft')}
            <span> {selectedGroup?.members.length} </span>
            {t('grpDetail.grpDetailRight')}
          </p>
        </div>

        <div className="mt-5 flex py-4 min-h-[4.5rem] w-[90%] items-center justify-start gap-2 rounded-[20px] bg-MainBgOne  px-3 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
          <Image width={25} height={25} alt="info" src="/svg/homePage/NewAccount/Path 54145.svg" />

          <div className="flex h-auto w-[90%] flex-wrap">
            <p className="font-IranYekanBold whitespace-normal break-words overflow-hidden text-[1.7dvh] text-MainTextOne">{selectedGroup?.description}</p>
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
            {/* {imagesItem.length
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
            ))} */}
          </div>
        </div>

        <div className="mt-5 flex h-auto w-[90%] flex-col items-start justify-start gap-1 rounded-[20px] bg-MainBgOne px-4 pb-3 pt-5 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
          <h3 className="font-IranYekanBold text-center text-[2dvh] text-MainTextOne text-black">{t('Member')}</h3>
          {selectedGroup?.members.map((item, index) => {
            return (
              <div
                key={index}
                className="mt-2 flex w-full flex-row items-center justify-start gap-3 rounded-[20px] border-2 border-gray-300 px-1 py-2"
              >
                <div>
                  {/* {item.image ? (
                    <Image src={item.image} alt={item.contact_name!} width={50} height={50} className="h-[5dvh] w-[5dvh] rounded-full" />
                  ) : (
                    <div className="flex h-[6dvh] w-[6dvh] items-start justify-start rounded-full bg-yellow-600">
                      {item?.contact_name?.trim()?.charAt(0) ?? '?'}
                    </div>
                  )} */}
                  <Image
                    width={65}
                    height={65}
                    className="bordobject-cover h-[5dvh] w-[5dvh] rounded-full border object-top"
                    src={'/svg/default_profile/user-profile.svg'}
                    alt="icon image"
                  />
                </div>
                <div className="flex flex-col items-start justify-between gap-2 py-[0.5rem]">
                  <p className="font-IranYekanBold text-[1.7dvh] text-MainTextOne">{item.contact_name}</p>
                  <p className="overflow-hidden text-ellipsis text-nowrap text-[1.3dvh] text-MainTextTwo">
                    <LastSeen socket={socket} userId={item.contact_id!} />
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex w-[90%] flex-col items-center justify-start gap-y-4 rounded-[20px] bg-MainBgOne px-5 py-7 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
          <div className="flex w-full cursor-pointer items-center justify-start gap-x-3">
            <Image width={30} height={30} className="h-[2.5dvh] w-[2.5dvh] object-contain" src={'/svg/userInfo/block.svg'} alt="icon image" />
            <p className="font-IranYekanBold text-[1.5dvh] text-[#D92626]" onClick={handleOpenLeaveModal}>
              {t('LeaveGroup')}
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
            <p className="font-IranYekanBold text-[1.5dvh] text-[#D92626]">{t('reportUser')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Index