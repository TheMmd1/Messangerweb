'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import { Call } from '@/lib/data/Call';
import { ChatData } from '@/lib/data/Conversation';
import { setCallDialog } from '@/store/slices/CallDialogSlice';
import { setNewHomeComp } from '@/store/slices/HomePageComponentsSlice';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

// بخش اضافه کردن تایپ ها
interface SearchResult {
  searchResult: ChatData[];
  isSearchOpen: boolean;
  query: string; 
}


const Index = ({ searchResult, isSearchOpen, query }: SearchResult) => { // <- Update this line to include query
  // اضافه کردن state ها و سایر tools ها
  const { t } = useTranslation();
  const dispatch = useDispatch();
  

  return (
    <React.Fragment>
      <div className="mt-[1.2rem] flex min-h-[100dvh] w-full flex-col items-center justify-start md:mt-5">
        <div className="flex min-h-[10dvh] w-[90%] items-center justify-start rounded-[15px] bg-MainBgTwo px-3">
          <div className="flex h-full w-full items-center justify-start gap-x-3">
            <div className="relative flex h-[6dvh] w-[6dvh] items-center justify-center rounded-full border border-white bg-MainBgThree md:h-[8dvh] md:w-[8dvh]">
              <Image
                width={35}
                height={35}
                className="h-1/2 w-1/2 rounded-full object-contain"
                src={'/svg/homePage/Call/callIcon.svg'}
                alt="icon image"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-y-2">
              <p className="font-IranYekanBold text-[2dvh] text-MainTextOne">{t('create_contact_link')}</p>
              <p className="font-IranYekanMedium mt-1 text-[1.5dvh] text-MainTextTwo">{t('contact_link_desc')}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex h-[calc(100dvh-10dvh)] w-full flex-col items-center justify-center gap-y-5">
          <p className="font-IranYekanMedium flex w-full items-center justify-end px-5 text-[2dvh] text-MainTextTwo">{t('last_calls')}</p>
          <div className="your-component-scrollbar flex h-full w-full flex-col items-center justify-start pb-[40dvh]">
            {/* when user is not searching */}
            {(!isSearchOpen || query.trim().length === 0) &&
              Call.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex min-h-[10dvh] w-full items-center justify-center rounded-xl px-3 transition-all duration-200 hover:bg-MainBgTwo"
                  >
                    <div className={`flex h-full w-[95%] items-center justify-between ${index + 1 !== Call.length && 'border-b border-[#C5E0D3]'}`}>
                      <div onClick={() => dispatch(setNewHomeComp('userDetail'))} className="flex cursor-pointer items-center justify-center gap-x-3">
                        <Image
                          width={65}
                          height={65}
                          className="h-[6dvh] w-[6dvh] rounded-full border border-[#F6F6F6] object-cover object-top md:h-[8dvh] md:w-[8dvh]"
                          src={item?.image}
                          alt="icon image"
                        />
                        <div className="flex flex-col items-center justify-center gap-y-2">
                          <p className={`font-IranYekanBold text-[1.8dvh ] md:text-[2dvh] ${item?.success ? 'text-[#38A271]' : 'text-[#D92626]'}`}>
                            {item?.title}
                          </p>
                          <div className="flex items-center justify-center gap-x-1">
                            <Image
                              width={20}
                              height={20}
                              className={`h-[1.4dvh] w-[1.4dvh] object-contain ${item?.success ? 'text-[#38A271]' : 'text-[#D92626]'}`}
                              src={item?.status === 'send' ? '/svg/homePage/Call/send.svg' : '/svg/homePage/Call/reseive.svg'}
                              alt="icon image"
                            />
                            <p className="-mb-1 text-[1.5dvh] text-MainTextTwo">{item?.createdAt}</p>
                          </div>
                        </div>
                      </div>
                      <div onClick={() => dispatch(setCallDialog(true))} className="flex cursor-pointer items-center justify-center">
                        <Image
                          width={35}
                          height={35}
                          className="h-[3dvh] w-[3dvh] object-contain md:h-[3.5dvh] md:w-[3.5dvh]"
                          src={item?.status === 'send' ? '/svg/homePage/Call/call.svg' : '/svg/homePage/Call/videoCall.svg'}
                          alt="icon image"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            {/* when user is searching */}
            {searchResult.length ? (
              searchResult.map((item: ChatData, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex min-h-[10dvh] w-full items-center justify-center rounded-xl px-3 transition-all duration-200 hover:bg-MainBgTwo"
                  >
                    <div className={`flex h-full w-[95%] items-center justify-between ${index + 1 !== Call.length && 'border-b border-[#C5E0D3]'}`}>
                      <div onClick={() => dispatch(setNewHomeComp('userDetail'))} className="flex cursor-pointer items-center justify-center gap-x-3">
                        <Image
                          width={65}
                          height={65}
                          className="h-[8dvh] w-[8dvh] rounded-full border border-[#F6F6F6] object-cover object-top"
                          src={item?.image}
                          alt="icon image"
                        />
                        <div className="flex flex-col items-center justify-center gap-y-2">
                          <p className={`font-IranYekanBold text-[2dvh] ${item?.success ? 'text-[#38A271]' : 'text-[#D92626]'}`}>{item?.title}</p>
                          <div className="flex items-center justify-center gap-x-1">
                            <Image
                              width={20}
                              height={20}
                              className={`h-[1.6dvh] w-[1.6dvh] object-contain ${item?.success ? 'text-[#38A271]' : 'text-[#D92626]'}`}
                              src={item?.status === 'send' ? '/svg/homePage/Call/send.svg' : '/svg/homePage/Call/reseive.svg'}
                              alt="icon image"
                            />
                            <p className="-mb-1 text-[1.5dvh] text-MainTextTwo">{item?.createdAt}</p>
                          </div>
                        </div>
                      </div>
                      <div onClick={() => dispatch(setCallDialog(true))} className="flex cursor-pointer items-center justify-center">
                        <Image
                          width={35}
                          height={35}
                          className="h-[3.5dvh] w-[3.5dvh] object-contain"
                          src={item?.status === 'send' ? '/svg/homePage/Call/call.svg' : '/svg/homePage/Call/videoCall.svg'}
                          alt="icon image"
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="mt-[50%] text-[1.7dvh] text-gray-700">{t('NoCallFound')}</p>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Index;
