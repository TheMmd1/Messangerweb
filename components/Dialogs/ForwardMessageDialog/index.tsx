import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { Checkbox, Dialog } from '@material-tailwind/react';
import Image from 'next/image';
import i18n from '@/i18n';
import LastSeen from '@/components/LastSeenCompo/Index';
import { useSelector } from 'react-redux';
import { ContactValue } from '@/store/slices/AccountInformationSlice';
import PulseLoading from '@/components/PulseLoading/Index';
import { Router } from 'next/router';


interface ForwardMessageType {
  open : boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
  socket: any;
};



const Index = ({open ,setOpen, socket} : ForwardMessageType) => {

  const {t} = i18n;
  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const iconRef = useRef(null);
  const { contactInfo } = useSelector((state: { accountInfo: { contactInfo: ContactValue[] } }) => state.accountInfo);
  const [showForwadBtn ,setShowForwardBtn] = useState(false);
  
  // Custom search filter
  const filteredResults = query
    ? contactInfo.filter((item) => {
      const name = item.contact_name || '';
        return name.toLowerCase().includes(query.toLowerCase());
      })
    : contactInfo;
    


  return (
    <div>
      <Dialog
        placeholder=""
        onPointerEnterCapture={[]}
        size={'xs'}
        open={open}
        handler={setOpen}
        className="p-2 sm:p-6"
        onPointerLeaveCapture={undefined}
      >
        <div className="rtl-custome flex w-full flex-col items-center justify-between bg-MainBgOne">
          {/* search */}
          <div className="relative flex h-[9dvh] w-full items-center md:h-[10dvh]">
            <div
              ref={iconRef}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="border-1 sm:h-[35px][35px] absolute right-1 z-50 mr-1 flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full border-blue-gray-400 bg-MainBgThree p-1 text-gray-400 md:h-[45px] md:w-[45px]"
            >
              <Image
                width={35}
                height={35}
                className="md:h-[4dvh][4dvh] z-50 h-[20px] max-h-[30px] w-[20px] max-w-[30px] object-contain"
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
              className={`py-6pr-14 placeholder[#A0BEB0] absolute z-0 h-[20px] w-[100%] rounded-[30px] border-2 border-[#A0BEB0] text-[13px] outline-none transition-all duration-300 placeholder:text-xs sm:text-[1rem] md:py-7 md:pr-16`}
            />
          </div>

          <div className="max-h-[50dvh] w-full overflow-y-auto">
            {!isSearchOpen ? (
              contactInfo?.map((item, index) => (
                <>
                  <ul className="w-full">
                    <li>
                      <label
                        onClick={() => setShowForwardBtn(true)}
                        htmlFor={index.toString()}
                        key={index}
                        className="flex h-[7dvh] w-full cursor-pointer flex-col items-start justify-center rounded-xl border-2 border-gray-200 px-[10px] py-[10px] transition-all duration-200 hover:bg-gray-200"
                      >
                        <div className="flex w-full items-center justify-between gap-x-3">
                          <div className="flex items-center gap-2">
                            <Image
                              className="h-[5dvh] w-[5dvh] rounded-full object-cover object-top md:h-[2.625rem] md:w-[2.625rem]"
                              src={'/svg/default_profile/user-profile.svg'}
                              width={56}
                              height={56}
                              alt="group image"
                            />
                            <div className="flex flex-col items-center justify-center">
                              <p className="font-IranYekanBold flex w-full items-center justify-start text-[1.7dvh] font-bold text-black md:text-[1.7dvh]">
                                {item?.contact_name || <PulseLoading width={'80%'} height={'2dvh'} />}
                              </p>
                              <p className="font-IranYekanDemiBold flex w-full items-center justify-start text-[1.5dvh] text-MainTextTwo md:text-[1.8dvh]">
                                <LastSeen socket={socket} userId={item.contact_id!} />
                              </p>
                            </div>
                          </div>
                          <input
                            id={index.toString()}
                            type="radio"
                            value=""
                            name="list-radio"
                            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                          />
                        </div>
                      </label>
                    </li>
                  </ul>
                </>
              ))
            ) : filteredResults.length > 0 ? (
              filteredResults?.map((item, index) => (
                <div
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
                        {item?.contact_name || <PulseLoading width={'80%'} height={'2dvh'} />}{' '}
                      </p>

                      <p className="font-IranYekanDemiBold flex w-full items-center justify-start text-[1.5dvh] text-MainTextTwo md:text-[1.8dvh]">
                        <LastSeen socket={socket} userId={(item as any).contact_id || (item as any).id} />
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="font-IranYekanBold mt-4 text-center text-[1.7dvh] text-gray-400">{t('no_results_found')}</p>
            )}
          </div>
          <div className="flex w-full justify-start">
            {showForwadBtn && (
              <button className="mt-3 rounded-[10px] bg-MainBgThree px-6 py-2 text-[18px] text-MainBgOne shadow-[0_1px_5px_#00000024]">ارسال</button>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Index