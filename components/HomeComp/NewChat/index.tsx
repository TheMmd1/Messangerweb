'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { addSlide } from '@/store/slices/ChangeSilde';
import { useDispatch, useSelector } from 'react-redux';
import LastSeen from '@/components/LastSeenCompo/Index';
import PulseLoading from '@/components/PulseLoading/Index';
import BackButton from '@/components/BackButton/BackButton';
import { ContactValue, setDirectIdBySocket } from '@/store/slices/AccountInformationSlice';
import { CreateContactModal } from '@/components/Dialogs/CreateContactDialog/Index';
import Loading from '../ConversationComp/loading';
import useUserStatus from '@/utils/useUserStatus';
// import useSearch from '@/utils/useSearch';

function Index({ socket }: { socket: WebSocket }) {
  // اضافه کردن state ها و سایر tools ها
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { contactInfo } = useSelector((state: { accountInfo: { contactInfo: ContactValue[] } }) => state.accountInfo);
  const { updatedArray } = useUserStatus();

  // تابع کلیک بر روی هر کاربر
  const handleClickUserProfile = (id: number | null) => {
    // if (socket) {
    //   socket.send(JSON.stringify({ event: 9048, data: { contact_id: id } }));
    // }
    const findDirectId = updatedArray.find((item) => item.chat.user_id_1 === id || item.chat.user_id_2 === id);
    dispatch(setDirectIdBySocket(findDirectId?.id));
  };

// const { isSearchOpen, setIsSearchOpen, searchRef, iconRef, query, handleSearchChange, searchResults } = useSearch(contactInfo, 'contact_name');

const [query, setQuery] = useState('');
const [isSearchOpen, setIsSearchOpen] = useState(false);
const searchRef = useRef(null);
const iconRef = useRef(null);

// Custom search filter
const filteredResults = query
  ? contactInfo.filter((item) => {
      const name = item.contact_name || item.title || '';
      return name.toLowerCase().includes(query.toLowerCase());
    })
  : contactInfo;



  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-start bg-MainBgThree">
      <header className="flex h-[8dvh] w-full items-center justify-end">
        <nav className={`flex w-full items-center justify-between px-5 ${localStorage.getItem('lang') === 'fa' ? 'ltr-custome' : 'rtl-custome'}`}>
          <BackButton />
          <p className="font-IranYekanBold text-[16px] text-white">{t('new_message')}</p>
          <span className="w-[35px]"></span>
        </nav>
      </header>
      <section className="rtl-custome box-shadow relative flex h-[calc(100dvh-8dvh)] w-full items-start justify-center rounded-t-[30px] bg-MainBgOne px-[25px] pt-4">
        <div className="relative flex h-full w-full flex-col items-center justify-start md:gap-y-4">
          <div className="flex w-full flex-col items-center justify-center gap-y-[5px] md:gap-y-3">
            <div
              onClick={() => {
                dispatch(addSlide('addNewGroup'));
              }}
              className={`flex h-[8.5dvh] w-full cursor-pointer items-center justify-start gap-x-3 rounded-3xl bg-MainBgTwo p-3 ${localStorage.getItem('lang') === 'fa' ? 'rtl-custome' : 'ltr-custome'}`}
            >
              <div className="flex h-[6dvh] w-[6dvh] items-center justify-center rounded-full bg-MainBgThree md:h-[7dvh] md:w-[7dvh]">
                <Image className="w-[50%] object-contain" src={'/svg/newGroup/addGroup.svg'} width={26} height={26} alt="add person" />
              </div>
              <p className="font-IranYekanMedium text-[1.8dvh] text-MainTextOne md:text-[2dvh]">{t('create_new_group')}</p>
            </div>
            <div
              onClick={() => dispatch(addSlide('createGroup'))}
              className={`flex h-[8.5dvh] w-full cursor-pointer items-center justify-start gap-x-3 rounded-3xl bg-MainBgTwo p-3 ${localStorage.getItem('lang') === 'fa' ? 'rtl-custome' : 'ltr-custome'}`}
            >
              <div className="flex h-[6dvh] w-[6dvh] items-center justify-center rounded-full bg-MainBgThree md:h-[7dvh] md:w-[7dvh]">
                <Image className="w-[50%] object-contain" src="/svg/homePage/NewChat/Path 54013.svg" width={26} height={26} alt="add person" />
              </div>
              <p className="font-IranYekanMedium text-[1.8dvh] text-MainTextOne md:text-[2dvh]">{t('create_new_organization')}</p>
            </div>
            <div
              onClick={() => dispatch(addSlide('channelSetting'))}
              className={`flex h-[8.5dvh] w-full cursor-pointer items-center justify-start gap-x-3 rounded-3xl bg-MainBgTwo p-3 ${localStorage.getItem('lang') === 'fa' ? 'rtl-custome' : 'ltr-custome'}`}
            >
              <div className="flex h-[6dvh] w-[6dvh] items-center justify-center rounded-full bg-MainBgThree md:h-[7dvh] md:w-[7dvh]">
                <Image className="w-[50%] object-contain" src={'/svg/homePage/NewChat/Path 54151.svg'} width={26} height={26} alt="add person" />
              </div>
              <p className="font-IranYekanMedium text-[1.8dvh] text-MainTextOne md:text-[2dvh]">{t('create_new_channel')}</p>
            </div>
          </div>
          <div
            className={`mt-5 flex w-full flex-col items-center justify-center gap-3 ${localStorage.getItem('lang') === 'fa' ? 'rtl-custome' : 'ltr-custome'}`}
          >
            <h3 className="font-IranYekanDemiBold flex w-full items-center justify-start text-[15px] text-MainTextTwo">{t('message_to_users')}</h3>

            <div className="relative flex h-[9dvh] w-full items-center md:h-[10dvh]">
              <div
                ref={iconRef}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="border-1 absolute right-1 z-50 mr-1 flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full border-blue-gray-400 bg-MainBgThree p-1 text-gray-400 sm:h-[35px] sm:w-[35px] md:h-[45px] md:w-[45px]"
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                ref={searchRef}
                placeholder={t('search')}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSearchOpen(true);
                }}
                type="text"
                className={`absolute z-0 h-[20px] w-[100%] rounded-[30px] border-2 border-[#A0BEB0] py-6 pl-5 pr-14 text-[13px] outline-none transition-all duration-300 placeholder:text-xs placeholder:text-[#A0BEB0] sm:text-[1rem] md:py-7 md:pr-16`}
              />
            </div>

            {socket ? (
              <>
                {!isSearchOpen ? (
                  contactInfo?.map((item, index) => (
                    <div
                      onClick={() => {
                        handleClickUserProfile(item.contact_id);
                        router.push(`/home/${item.GUID}`);
                      }}
                      key={index}
                      className="flex w-full cursor-pointer flex-col items-start justify-center rounded-lg py-[10px] pr-[10px] transition-all duration-200 hover:bg-gray-200"
                    >
                      <div className="flex items-center justify-center gap-x-3">
                        <Image
                          className="h-[5dvh] w-[5dvh] rounded-full object-cover object-top md:h-[2.625rem] md:w-[2.625rem]"
                          src={'/svg/default_profile/user-profile.svg'}
                          width={56}
                          height={56}
                          alt="group image"
                        />
                        <div className="flex flex-col items-center justify-center gap-y-3">
                          <p className="font-IranYekanDemiBold flex w-full items-center justify-start text-[1.8dvh] text-MainTextOne md:text-[2dvh]">
                            {item?.contact_name ? item?.contact_name : <PulseLoading width={'80%'} height={'2dvh'} />}
                          </p>
                          <p className="font-IranYekanDemiBold flex w-full items-center justify-start text-[1.5dvh] text-MainTextTwo md:text-[1.8dvh]">
                            <LastSeen socket={socket} userId={item.contact_id!} />
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : filteredResults.length > 0 ? (
                  filteredResults?.map((item, index) => (
                    <div
                      onClick={() => {
                        handleClickUserProfile(item.id);
                      }}
                      key={index}
                      className="flex w-full cursor-pointer flex-col items-start justify-center rounded-lg py-[10px] pr-[10px] transition-all duration-200 hover:bg-gray-200"
                    >
                      <div className="flex items-center justify-center gap-x-3">
                        <Image
                          className="h-[5dvh] w-[5dvh] rounded-full object-cover object-top md:h-[2.625rem] md:w-[2.625rem]"
                          src={'/svg/default_profile/user-profile.svg'}
                          width={56}
                          height={56}
                          alt="group image"
                        />
                        <div className="flex flex-col items-center justify-center gap-y-3">
                          <p className="font-IranYekanDemiBold flex w-full items-center justify-start text-[1.8dvh] text-MainTextOne md:text-[2dvh]">
                            {item?.contact_name || item?.title || item?.name || <PulseLoading width={'80%'} height={'2dvh'} />}
                          </p>

                          <p className="font-IranYekanDemiBold flex w-full items-center justify-start text-[1.5dvh] text-MainTextTwo md:text-[1.8dvh]">
                            <LastSeen socket={socket} userId={item.contact_id || item.id} />
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="font-IranYekanBold mt-4 text-center text-gray-400 text-[1.7dvh]">{t('no_results_found')}</p>
                )}
              </>
            ) : (
              <Loading dir="fa" />
            )}
          </div>
        </div>
      </section>
      <button
        onClick={() => setOpen(true)}
        className="absolute bottom-[2rem] end-[1.25rem] z-10 flex h-[54px] w-[54px] items-center justify-center rounded-full border-none bg-MainBgThree text-center text-[1.5rem] outline-none"
      >
        <span className="text-3xl text-white">
          <Image width={30} height={30} alt="plus icon" src="/images/homePage/plus-icon.svg" />
        </span>
      </button>
      <CreateContactModal open={open} setOpen={setOpen} socket={socket} />
    </div>
  );
}

export default Index;
