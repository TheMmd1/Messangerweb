'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useSearch from '@/utils/useSearch';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import BackButton from '../BackButton/BackButton';
import { Checkbox } from '@material-tailwind/react';
import useProfileImage from '@/utils/useProfileImage';
import { addSlide, handleBack } from '@/store/slices/ChangeSilde';
import {  ChatData, Conversation } from '../../lib/data/Conversation';
import { addGroup } from '@/store/slices/GroupSlice';
import { ContactValue } from '@/store/slices/AccountInformationSlice';
import LastSeen from '@/components/LastSeenCompo/Index';


interface groupType { 
  id: number;
  name: string;
  description: string;
  members: ChatData[];
  image: string;
}


export default function Index({ socket }: { socket: WebSocket }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { selectedImage, handleImageChange } = useProfileImage();

  // const handleCreateGroup = () => {
  //   if (searchResults.length > 0) {
  //     dispatch(handleBack());
  //   } else {
  //     toast.error('No user found');
  //   }
  // };

  const { isSearchOpen, setIsSearchOpen, searchRef, iconRef, query, handleSearchChange, searchResults } = useSearch(Conversation, 'title');

  useEffect(() => {
    if (isSearchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSearchOpen]);

  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');

  const handleUserToggle = (userId: number) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]));
  };
  const handleCreateGroup = () => {
    if (selectedUsers.length > 0) {
      const group: groupType = {
        id: Date.now(),
        name: groupName,
        description: groupDesc,
        members: selectedUsers.map((id) => contactInfo.find((user) => user.contact_id === id)).filter((user) => user !== undefined),

        image: selectedImage, // from useProfileImage
      };

      console.log('New Group Created:', group);

      dispatch(addGroup(group));
      dispatch(addSlide('GroupListComp'));
    } else {
      toast.error('No users selected');
    }
  };

  const { contactInfo } = useSelector((state: { accountInfo: { contactInfo: ContactValue[] } }) => state.accountInfo);
  console.log(contactInfo);

  return (
    <div className="rtl-custome flex min-h-[100dvh] w-full flex-col items-center justify-start bg-MainBgThree">
      <header className="flex h-[8dvh] w-full items-center justify-end">
        <nav
          className={`relative flex w-full items-center justify-between px-5 ${localStorage.getItem('lang') === 'fa' ? 'rtl-custome' : 'ltr-custome'}`}
        >
          <p className="font-IranYekanBold m-auto pr-4 text-[2dvh] text-white">{t('new group')}</p>
          <BackButton />
        </nav>
      </header>

      <section className="box-shadow relative flex h-[calc(100dvh-8dvh)] w-full flex-col items-center rounded-t-[30px] bg-MainBgTwo px-[20px] pt-4">
        <div className="flex w-full flex-col items-center justify-start gap-y-3 rounded-[20px] bg-MainBgOne px-7 pb-4 pt-6 md:pb-9">
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
              <div className="absolute -bottom-1 -left-1 flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-full border border-white bg-MainBgThree">
                <Image width={15} height={15} className="h-[13px] w-[15px] object-contain" src={'/svg/channel/camera.svg'} alt="icon image" />
              </div>
            </label>
            <input
              placeholder={t('group_name')}
              className="placeholder:font-IranYekanBold w-[calc(100%-55px)] border-b border-[#A0BEB0] py-3 pl-5 pr-3 outline-none placeholder:text-MainTextOne placeholder:text-[#A0BEB0]"
              type="text"
              onChange={(e) => setGroupName(e.target.value)}
              value={groupName}
            />
          </div>
          <input
            placeholder={t('Description_optional')}
            className="placeholder:font-IranYekanBold w-full border-b border-[#A0BEB0] py-3 pl-5 pr-3 outline-none placeholder:text-[#A0BEB0]"
            type="text"
            value={groupDesc}
            onChange={(e) => setGroupDesc(e.target.value)}
          />
        </div>

        <div className="relative mt-2 flex w-full items-center justify-start gap-2 py-3">
          <h3 className="font-IranYekanDemiBold pr-[5px] text-[18px]">{t('users')}</h3>
        </div>

        <div className="your-component-scrollbar relative h-[calc(100dvh-10dvh)] w-full">
          {/* search */}
          <div className="relative flex h-[9dvh] w-full items-center md:h-[10dvh]">
            <div
              ref={iconRef}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="border-1 absolute right-1 z-50 mr-1 flex h-[4.5dvh] w-[4.5dvh] cursor-pointer items-center justify-center rounded-full border-blue-gray-400 bg-MainBgThree p-1 text-gray-400 sm:h-[35px] sm:w-[35px] md:h-[45px] md:w-[45px]"
            >
              <Image
                width={35}
                height={35}
                className="z-50 h-[20px] max-h-[30px] w-[20px] max-w-[30px] object-contain md:h-[4dvh] md:w-[4dvh]"
                src={'/svg/homePage/searchIcon.svg'}
                alt="icon image"
              />
            </div>
            <input
              dir="rtl"
              onChange={(e) => handleSearchChange(e)}
              ref={searchRef}
              placeholder={t('search')}
              onClick={(e) => {
                e.stopPropagation();
                setIsSearchOpen(!isSearchOpen);
              }}
              type="text"
              className={`absolute z-0 h-[20px] w-[100%] rounded-[30px] border-2 border-[#A0BEB0] py-6 pl-5 pr-14 text-[13px] outline-none transition-all duration-300 placeholder:text-xs placeholder:text-[#A0BEB0] sm:text-[1rem] md:py-7 md:pr-16`}
            />
          </div>

          <div className="h-[70%] overflow-auto">
            {/* when search is not open */}
            {!isSearchOpen || query.trim().length === 0 ? (
              contactInfo.map((item, index) => (
                <label
                  key={index}
                  className="mb-3 mt-5 flex w-full cursor-pointer items-center justify-center rounded-2xl border bg-MainBgOne px-2 transition-all duration-200 hover:border-MainBgThree sm:px-3"
                >
                  <div className={'flex min-h-[7dvh] w-full items-center justify-between '}>
                    <div className="flex items-center justify-center ">
                      <div className="relative flex h-[8dvh] w-[8dvh] items-center justify-center">
                        <span
                          className={`${!item?.online && 'hidden'} absolute right-[3px] top-[3px] h-[10px] w-[10px] rounded-full border border-[#F6F6F6] bg-MainBgThree`}
                        ></span>
                        <Image
                          width={65}
                          height={65}
                          className="h-[5dvh] w-[5dvh] rounded-full border border-[#F6F6F6] object-cover object-top"
                          src={'/svg/default_profile/user-profile.svg'}
                          alt="icon image"
                        />
                      </div>
                      <div className="flex flex-col items-start justify-center gap-y-2 ">
                        <p className="font-IranYekanBold text-[1.9dvh] text-MainTextOne ">{item?.contact_name}</p>
                        <p className="text-[1.5dvh] text-MainTextTwo">
                          <LastSeen socket={socket} userId={item.contact_id!} />
                        </p>
                      </div>
                    </div>
                    <div className="mt-1">
                      <Checkbox
                        color="green"
                        checked={selectedUsers.includes(item?.contact_id)}
                        onChange={() => handleUserToggle(item?.contact_id)}
                        onPointerEnterCapture
                        onPointerLeaveCapture
                        crossOrigin
                      />
                    </div>
                  </div>
                </label>
              ))
            ) : // when search is open and results are found
            searchResults.length ? (
              searchResults.map((item, index) => (
                <label
                  key={index}
                  className="mb-3 mt-5 flex w-full cursor-pointer items-center justify-center rounded-2xl border bg-MainBgOne px-2 transition-all duration-200 hover:border-MainBgThree sm:px-3"
                >
                  <div className={'flex min-h-[7dvh] w-full items-center justify-between '}>
                    <div className="flex items-center justify-center ">
                      <div className="relative flex h-[8dvh] w-[8dvh] items-center justify-center">
                        <span
                          className={`${!item?.online && 'hidden'} absolute right-[3px] top-[3px] h-[10px] w-[10px] rounded-full border border-[#F6F6F6] bg-MainBgThree`}
                        ></span>
                        <Image
                          width={65}
                          height={65}
                          className="h-[5dvh] w-[5dvh] rounded-full border border-[#F6F6F6] object-cover object-top"
                          src={item?.image}
                          alt="icon image"
                        />
                      </div>
                      <div className="flex flex-col items-start justify-center gap-y-2 ">
                        <p className="font-IranYekanBold text-[1.9dvh] text-MainTextOne ">{item?.title}</p>
                        <p className="text-[1.5dvh] text-MainTextTwo">{item?.desc}</p>
                      </div>
                    </div>
                    <div className="mt-1">
                      <Checkbox onPointerEnterCapture onPointerLeaveCapture crossOrigin color="green" />
                    </div>
                  </div>
                </label>
              ))
            ) : (
              // when search is open and there is no result
              <p>{t('NoUserFound')}</p>
            )}
          </div>
        </div>

        <button
          onClick={handleCreateGroup}
          className="absolute bottom-3 right-5 rounded-[10px] bg-MainBgThree px-7 py-3 text-[18px] text-MainBgOne shadow-[0_1px_5px_#00000024]"
        >
          {t('confirm')}
        </button>
      </section>
    </div>
  );
}
