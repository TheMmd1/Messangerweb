'use client';

//
import Image from 'next/image';
import Conversation from '../HomeComp/ConversationComp';
import StoryComp from '../HomeComp/StoryComp';
import CallComp from '../HomeComp/CallComp';
import GroupListComp from '../GroupListComp/index'
import Badge from '../HomeComp/badgeComp';
import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNewHambergerStatus } from '@/store/slices/HambergerMenuSlice';
import { useTranslation } from 'react-i18next';
import useSearch from '@/utils/useSearch';
import { Story as StoryData } from '../../lib/data/Story';
import { Call as CallData } from '../../lib/data/Call';
import { ChatData, Conversation as ConversationData } from '../../lib/data/Conversation';
import { addSlide } from '@/store/slices/ChangeSilde';

const Index = ({ socket, defaultTab = 1 }: { socket: WebSocket; defaultTab?: number }) => {
  // اضافه کردن state ها و سایر tools ها
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [tab, setTab]: [number, Dispatch<SetStateAction<number>>] = useState<number>(defaultTab);

  // استفاده از custom hook برای سرچ کردن
  const SearchData: ChatData[] | readonly ChatData[] = tab === 1 ? ConversationData : tab === 2 ? StoryData : CallData;
  const { isSearchOpen, setIsSearchOpen, searchRef, iconRef, searchResults, query, setQuery, handleSearchChange } = useSearch(SearchData, 'title');

  // پاک کردن مقدار input با هربار تغییر تب ها
  useEffect(() => {
    setQuery('');
  }, [tab, setQuery]);

  useEffect(() => {
    if (isSearchOpen && searchRef.current) {
      searchRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearchOpen]);

  return (
    <React.Fragment>
      <main className="relative flex min-h-[100dvh] w-full items-center justify-center">
        <div className="flex min-h-[100dvh] w-full flex-col items-center justify-start bg-MainBgThree">
          <header className={`flex w-full flex-col items-center justify-center`}>
            <nav
              className={`relative flex h-[7.5dvh] w-full items-center justify-between bg-MainBgThree px-5 ${t('system_lang') === 'fa' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <Image
                onClick={() => dispatch(setNewHambergerStatus(true))}
                width={30}
                height={30}
                className={`${t('system_lang') === 'fa' ? 'rotateYMenu' : ''} h-[4dvh] max-h-[30px] w-[2dvh] max-w-[30px] cursor-pointer object-contain sm:w-[3dvh] lg:w-[4dvh]`}
                src={'/svg/homePage/hambergerMenu.svg'}
                alt="icon image"
              />
              <div className="font-IranYekanBold cursor-pointer text-[2dvh] text-white">
                {socket ? (
                  t('app name')
                ) : (
                  <div className="flex items-center gap-2">
                    <p> {t('loadingText')}...</p>
                    <div className="h-5 w-5 animate-spin rounded-full border border-l-0 border-t-0"></div>
                  </div>
                )}
              </div>
              <div ref={iconRef} onClick={() => setIsSearchOpen(!isSearchOpen)} className="w-fit cursor-pointer p-1">
                <Image
                  width={35}
                  height={35}
                  className="h-[4dvh] max-h-[30px] w-[2dvh] max-w-[30px] object-contain sm:w-[3dvh] lg:w-[4dvh]"
                  src={'/svg/homePage/searchIcon.svg'}
                  alt="icon image"
                />
              </div>
              {/* search box responsive */}
              <input
                dir="rtl"
                onChange={(e) => {
                  handleSearchChange(e);
                }}
                ref={searchRef}
                placeholder={t('search')}
                onClick={(e) => e.stopPropagation()}
                type="text"
                className={`absolute right-[3.5rem] top-[50%] rounded-[30px] border-none p-2 text-[13px] outline-none placeholder:text-xs placeholder:text-gray-500 sm:p-[10px] sm:text-[1rem] ${isSearchOpen ? 'z-[8888] w-[55dvw] sm:w-[55%]' : 'z-[-1] w-0'} -translate-y-[50%] transition-all duration-300`}
              />
            </nav>
            {/* تب ها */}
            <section
              className={`mt-3 flex h-[2.1dvh] w-full items-center justify-around bg-MainBgThree ${t('system_theme') === 'fa' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                onClick={() => setTab(1)}
                className={`3xl:w-32 flex w-24 cursor-pointer items-center justify-center gap-x-3 border-b-[3px] pb-1 text-white transition-all duration-200 md:border-b-4 ${tab === 1 ? 'border-white' : 'border-MainBgThree'}`}
              >
                {/* <span className="flex h-[2dvh] w-[2dvh] items-center justify-center rounded-full bg-[#eff8f4] text-[1.2dvh] text-[#38A271]">3</span> */}
                <p className="font-IranYekanDemiBold whitespace-nowrap text-[1.6dvh]">{t('allChats')}</p>
              </div>
              <div
                onClick={() => setTab(2)}
                className={`3xl:w-32 flex w-24 cursor-pointer items-center justify-center gap-x-3 border-b-[3px] pb-1 text-white transition-all duration-200 md:border-b-4 ${tab === 2 ? 'border-white' : 'border-MainBgThree'}`}
              >
                <span className="flex h-[7px] w-[7px] items-center justify-center rounded-full bg-[#eff8f4]"></span>
                <p className="font-IranYekanDemiBold whitespace-nowrap text-[1.6dvh]">{t('story')}</p>
              </div>
              <div
                onClick={() => setTab(3)}
                className={`3xl:w-32 flex w-24 cursor-pointer items-center justify-center gap-x-3 border-b-[3px] pb-1 text-white transition-all duration-200 md:border-b-4 ${tab === 3 ? 'border-white' : 'border-MainBgThree'}`}
              >
                <p className="font-IranYekanDemiBold whitespace-nowrap text-[1.6dvh]">{t('call')}</p>
              </div>
              <div
                onClick={() => setTab(4)}
                className={`3xl:w-32 flex w-24 cursor-pointer items-center justify-center gap-x-3 border-b-[3px] pb-1 text-white transition-all duration-200 md:border-b-4 ${tab === 4 ? 'border-white' : 'border-MainBgThree'}`}
              >
                <p className="font-IranYekanDemiBold whitespace-nowrap text-[1.6dvh]">{t('Groups')}</p>
              </div>
            </section>
          </header>

          <div className="box-shadow ltr-custome mt-4 flex max-h-[calc(100dvh-11dvh)] w-full items-start justify-center overflow-hidden rounded-t-[30px] bg-MainBgOne md:rounded-t-none">
            {tab === 1 ? (
              <Conversation socket={socket} isSearchOpen={isSearchOpen} query={query} />
            ) : tab === 2 ? (
              <StoryComp searchResult={searchResults} isSearchOpen={isSearchOpen} query={query} />
            ) : tab === 3 ? (
              <CallComp searchResult={searchResults} isSearchOpen={isSearchOpen} query={query} />
            ) : (
              tab === 4 && <GroupListComp />
            )}
          </div>
        </div>
        <Badge tab={tab} />
      </main>
    </React.Fragment>
  );
};

export default Index;
