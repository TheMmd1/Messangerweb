'use client';

import i18n from '@/i18n';
import { RootState } from '@/store/store';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedGroupInfo, updateSelectedGroupImage, kickGroupMember } from '@/store/slices/GroupSlice';
import { addSlide } from '@/store/slices/ChangeSilde';
import { leaveGroup } from '@/store/slices/GroupSlice';
import useProfileImage from '@/utils/useProfileImage';
import LastSeen from '@/components/LastSeenCompo/Index';
import { toast } from 'react-toastify';


const EditGroupDetails = ({ socket }: { socket: WebSocket }) => {
  const dispatch = useDispatch();
  const selectedGroup = useSelector((state: RootState) => state.groups.selectedGroup);
  const { t } = i18n;

  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const [isKickModalOpen, setIsKickModalOpen] = useState(false);
  const [memberToKick, setMemberToKick] = useState<number | null>(null);

  useEffect(() => {
    if (selectedGroup) {
      setGroupName(selectedGroup.name);
      setGroupDesc(selectedGroup.description);
    }
  }, [selectedGroup]);

  useEffect(() => {
    return () => {
      if (selectedGroup?.image?.startsWith('blob:')) {
        URL.revokeObjectURL(selectedGroup.image);
      }
    };
  }, [selectedGroup?.image]);

  const handleUpdateInfo = () => {
    dispatch(updateSelectedGroupInfo({ name: groupName, description: groupDesc }));
    toast.success(t('toastGrp.success'));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      dispatch(updateSelectedGroupImage({ image: imageUrl }));
    }
  };

  const openKickModal = (id: number) => {
    setMemberToKick(id);
    setIsKickModalOpen(true);
  };

  const confirmKick = () => {
    if (memberToKick !== null) {
      dispatch(kickGroupMember({ memberId: memberToKick }));
      setIsKickModalOpen(false);
      setMemberToKick(null);
    }
  };

  const cancelKick = () => {
    setIsKickModalOpen(false);
    setMemberToKick(null);
  };

  const handleDescription = (e) => {
    const maxCharactersDesc = e.target.value;

    if (maxCharactersDesc.length < 100) {
      setGroupDesc(e.target.value);
    } else {
      setGroupDesc(maxCharactersDesc.slice(0, 100));
    }
  };

  const { selectedImage } = useProfileImage();

  if (!selectedGroup) return null;

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-start justify-start">
      <header className="flex h-[8dvh] w-full items-center justify-between">
        <p className="font-IranYekanMedium m-auto pr-6 text-center text-2xl text-[1.8dvh] text-MainTextTwo text-white">{t('editGroupDetails')}</p>
        <div
          onClick={() => dispatch(addSlide('GroupDetail'))}
          className={`flex w-[35px] items-center pl-3 ${t('system_lang') === 'en' ? 'rotateYMenu justify-end' : 'justify-start'}`}
        >
          <Image
            width={35}
            height={30}
            className="h-[2.5dvh] w-[2.5dvh] cursor-pointer object-contain"
            src={'/svg/Setting/arrowLeft.svg'}
            alt={t('go_back') || 'Back'}
          />
        </div>
      </header>

      <div className="rtl-custome your-component-scrollbar flex h-[calc(100dvh-8dvh)] w-full flex-col items-center justify-start rounded-t-[30px] bg-MainBgOne">
        <div className="relative item-center mt-5 flex h-auto w-[90%] flex-col items-center rounded-[20px] bg-MainBgOne p-5 px-3 shadow-md">
          {selectedGroup.image ? (
            <div className='w-[200px] h-[200px] relative'>
              <Image src={selectedGroup.image} alt="group photo" width={200} height={200} className="rounded-full object-cover" />
              <label className="absolute bottom-[10px] right-0 flex h-[5.7dvh] w-[5.7dvh] cursor-pointer items-center justify-center rounded-full border-[3px] border-MainBgTwo bg-MainBgThree">
                <input className="h-full w-full" hidden type="file" accept="image/*" onChange={handleImageChange} />
                <Image width={20} height={20} alt="" src="/svg/homePage/NewAccount/Path 54014.svg" />
              </label>
            </div>
          ) : (
            // <div className="font-IranYekanBold flex h-[160px] w-[160px] items-center justify-center rounded-full bg-MainBgThree">
            //   <span className="text-[4vh] text-white">{selectedGroup.name.charAt(0)}</span>
            // </div>
            <div className="font-IranYekanBold flex h-[17dvh] w-[17dvh] translate-x-[5%] items-center justify-center rounded-full bg-MainBgThree md:h-[20dvh] md:w-[20dvh] lg:max-h-[140px] lg:max-w-[140px]">
              {/* <Image
                width={125}
                height={125}
                className="h-[18dvh] w-[18dvh] cursor-pointer rounded-full object-cover object-top lg:max-h-[125px] lg:max-w-[125px]"
                src={selectedGroup.image}
                alt=""
              /> */}
              <Image
                // onClick={() => dispatch(setNewProfile(true))}
                width={125}
                height={125}
                className="h-[137px] w-[230px] cursor-pointer rounded-full object-contain object-top pb-[10px]"
                src="/svg/homePage/HambergerMenu/newGroupIcon.svg"
                alt="icon image"
              />
              <label className="absolute bottom-0 right-0 flex h-[5.7dvh] w-[5.7dvh] cursor-pointer items-center justify-center rounded-full border-[3px] border-MainBgTwo bg-MainBgThree">
                <input className="h-full w-full" hidden type="file" accept="image/*" onChange={handleImageChange} />
                <Image width={20} height={20} alt="" src="/svg/homePage/NewAccount/Path 54014.svg" />
              </label>
            </div>
          )}

          {/* <label className="mt-3 inline-flex cursor-pointer items-center rounded-lg bg-MainBgThree px-7 py-3 text-[18px] text-MainBgOne text-white shadow-[0_1px_5px_#00000024] hover:cursor-pointer">
            {t('changeGroupImage')}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" aria-label={t('change_group_image')} />
          </label> */}

          <label className="mt-6 w-full">
            <p className="font-IranYekanBold text-right text-[1.7dvh] text-MainTextOne text-black">{t('groupName')}</p>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="z-0 mt-4 w-full rounded-[30px] border-2 border-[#A0BEB0] px-5 py-6 text-[16px] leading-[18px] outline-none placeholder:text-xs placeholder:text-[#A0BEB0] sm:text-[1rem] md:py-7"
              placeholder={t('group_name')}
              aria-label={t('group_name')}
            />
          </label>

          <label className="mt-6 w-full">
            <p className="font-IranYekanBold text-right text-[1.7dvh] text-MainTextOne text-black">{t('description')}</p>
            <textarea
              value={groupDesc}
              onChange={handleDescription}
              className="z-0 mt-4 w-full rounded-[30px] border-2 border-[#A0BEB0] px-5 py-6 text-[16px] leading-[18px] outline-none placeholder:text-[#A0BEB0] md:py-7"
              placeholder={t('description')}
              aria-label={t('description')}
            />
            <p className="pt-4">
              {' '}
              {t('characterMax.descriptionLeft')} <span className="text-red-500">{100 - groupDesc.length} </span>
              {t('characterMax.descriptionRight')}
            </p>
          </label>
          <div className="mt-6 flex w-full justify-start">
            <button
              onClick={handleUpdateInfo}
              className="rounded-[10px] bg-MainBgThree px-7 py-3 text-[18px] text-MainBgOne shadow-[0_1px_5px_#00000024]"
              aria-label={t('save_changes')}
            >
              {t('saveChange')}
            </button>
          </div>
        </div>

        <div className="mt-5 flex h-auto w-[90%] flex-col items-start justify-start gap-1 rounded-[20px] bg-MainBgOne px-4 pb-3 pt-5 shadow-md">
          <div className="mb-4 flex w-full items-center justify-between">
            <h3 className="font-IranYekanBold text-[2dvh] text-MainTextOne text-black">{t('members')}</h3>
            <button
              onClick={() => dispatch(addSlide('AddGroupMember'))}
              className="rounded-[10px] bg-MainBgThree px-7 py-3 text-[18px] text-MainBgOne shadow-[0_1px_5px_#00000024]"
              aria-label={t('add_member')}
            >
              {t('addMember')}
            </button>
          </div>
          {selectedGroup.members.map((item) => (
            <div
              key={item.contact_id}
              className="mt-2 flex w-full items-center justify-between gap-3 rounded-[20px] border-2 border-gray-300 px-2 py-2"
            >
              <div className="flex items-center gap-2">
                {/* {item.image ? (
                  <Image src={item.image} alt={item.title || 'Member'} width={50} height={50} className="h-[5dvh] w-[5dvh] rounded-full" />
                ) : (
                  <div className="flex h-[5dvh] w-[5dvh] items-center justify-center rounded-full bg-yellow-600 text-white">
                    {item.contact_name?.trim().charAt(0)}
                  </div>
                )} */}
                <Image
                  width={65}
                  height={65}
                  className="h-[5dvh] w-[5dvh] rounded-full border border-[#F6F6F6] object-cover object-top"
                  src={'/svg/default_profile/user-profile.svg'}
                  alt="icon image"
                />
                <div className="flex flex-col items-start gap-2">
                  <p className="font-IranYekanBold text-[1.7dvh] text-MainTextOne">{item.contact_name}</p>
                  <p className="text-[1.3dvh] text-MainTextTwo">
                    <LastSeen socket={socket} userId={item.contact_id!} />
                  </p>
                </div>
              </div>
              <button onClick={() => openKickModal(item.contact_id)} className="px-3 py-1" aria-label={t('kick')}>
                <Image src="/images/homePage/delete-icon.svg" alt="" width={25} height={25} />
              </button>
            </div>
          ))}
        </div>

        {isKickModalOpen && (
          <div className="fixed z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
            <div className="absolute top-[33%] flex h-[200px] w-[80%] max-w-md flex-col items-center justify-center rounded-lg bg-white p-6 text-center shadow-lg">
              <p className="pb-4 text-lg font-semibold text-gray-800">{t('confirmKickMember') || 'Are you sure?'}</p>
              <div className="flex justify-center gap-4">
                <button onClick={confirmKick} className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                  {t('kick')}
                </button>
                <button onClick={cancelKick} className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400">
                  {t('cancel')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditGroupDetails;
