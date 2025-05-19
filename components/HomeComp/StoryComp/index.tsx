'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import Image from 'next/image';
import React, { useState } from 'react';
import { Story } from '@/lib/data/Story';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ChatData, Conversation } from '@/lib/data/Conversation';
import StoryComponent from '@/components/StoryComp/StoryComponent2';
import AddStoryComponent from '@/components/StoryComp/AddStoryComponent';

// بخش اضافه کردن تایپ ها
interface SearchResult {
  searchResult: ChatData[]; 
  isSearchOpen: boolean;
  query:string
}
interface AddStoryDialog {
  AddStoryDialog: boolean;
}

const Index = ({ searchResult , isSearchOpen , query }: SearchResult) => {
  // اضافه کردن state ها و سایر tools ها
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const AddStoryDialog = useSelector((state: AddStoryDialog) => state.AddStoryDialog);



const storiesToRender = isSearchOpen && query.trim() !== '' ? searchResult : Story;


  

  return (
    <React.Fragment>
      <div className="mt-[1.2rem] flex min-h-[100dvh] w-full flex-col items-center justify-start md:mt-5">
        <div className="flex min-h-[10dvh] w-[90%] items-center justify-start rounded-[15px] bg-MainBgTwo px-3">
          <div className="flex h-full w-full items-center justify-start gap-x-3">
            <div onClick={() => setOpen(true)} className="relative flex h-[8dvh] w-[8dvh] cursor-pointer items-center justify-center">
              <Image
                width={55}
                height={55}
                className="h-[8dvh] w-[8dvh] rounded-full border border-[#F6F6F6] object-cover object-top"
                src={'/svg/default_profile/user-profile.svg'}
                alt="icon image"
              />
              <div className="font-IranYekanLight absolute bottom-0 left-0 flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-full border border-white bg-MainBgThree text-[18px] text-white">
                <Image
                  width={20}
                  height={20}
                  className="h-[10px] w-[10px] rounded-full object-cover"
                  src={'/svg/homePage/Story/plus.svg'}
                  alt="plus icon"
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-center gap-y-2">
              <p className="font-IranYekanBold text-[2dvh] text-MainTextOne">{t('my_story')}</p>
              <p className="font-IranYekanMedium text-[1.5dvh] leading-5 text-MainTextTwo">{t('click_for_publish_story')}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex h-full w-full flex-col items-center justify-center gap-y-5">
          <p className="font-IranYekanMedium flex w-full items-center justify-end px-5 text-[2dvh] text-MainTextTwo">{t('last_updates')}</p>
          <div className="your-component-scrollbar flex w-full flex-col items-center justify-start pb-[40dvh]">
            {/* when user is not searching */}
            {!isSearchOpen &&
              Story.map((item: ChatData, index: number) => {
                return (
                  <div
                    key={index}
                    onClick={() => setOpen(true)}
                    className="flex min-h-[10dvh] w-full cursor-pointer items-center justify-center rounded-xl px-5 transition-all duration-200 hover:bg-MainBgTwo"
                  >
                    <div className={`flex h-full w-full items-center justify-between ${index + 1 !== Story.length && 'border-b border-[#C5E0D3]'}`}>
                      <div className="flex items-center justify-center gap-x-3">
                        <Image
                          width={65}
                          height={65}
                          className={`h-[6dvh] w-[6dvh] rounded-full md:h-[8dvh] md:w-[8dvh] ${item?.notif !== 0 && 'border-[3px] border-MainBgThree'} object-cover object-top p-[3px]`}
                          src={item?.image}
                          alt="icon image"
                        />
                        <div className="flex flex-col items-start justify-center gap-y-2">
                          <p className="font-IranYekanBold text-[2dvh] text-MainTextOne">{item?.title}</p>
                          <p className="text-[1.5dvh] text-MainTextTwo">{item?.createdAt}</p>
                        </div>
                      </div>
                      <div className="-mt-5 flex items-center justify-center">
                        {item?.notif !== 0 && (
                          <span className="flex h-[3dvh] w-[3dvh] items-center justify-center rounded-full bg-MainBgThree text-[1.5dvh] text-white">
                            {item?.notif}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            {/* when user is searching */}
            {storiesToRender.length ? (
              storiesToRender.map((item: ChatData, index: number) => {
                return (
                  <div
                    key={index}
                    onClick={() => setOpen(true)}
                    className="flex min-h-[10dvh] w-full cursor-pointer items-center justify-center rounded-xl px-5 transition-all duration-200 hover:bg-MainBgTwo"
                  >
                    <div className={`flex h-full w-full items-center justify-between ${index + 1 !== Story.length && 'border-b border-[#C5E0D3]'}`}>
                      <div className="flex items-center justify-center gap-x-3">
                        <Image
                          width={65}
                          height={65}
                          className={`h-[8dvh] w-[8dvh] rounded-full md:h-[10dvh] md:w-[10dvh] ${item?.notif !== 0 && 'border-[3px] border-MainBgThree'} object-cover object-top p-[3px]`}
                          src={item?.image}
                          alt="icon image"
                        />
                        <div className="flex flex-col items-start justify-center gap-y-2">
                          <p className="font-IranYekanBold text-[1.8dvh] text-MainTextOne md:text-[2dvh]">{item?.title}</p>
                          <p className="text-[1.5dvh] text-MainTextTwo">{item?.createdAt}</p>
                        </div>
                      </div>
                      <div className="-mt-5 flex items-center justify-center">
                        {item?.notif !== 0 && (
                          <span className="flex h-[3dvh] w-[3dvh] items-center justify-center rounded-full bg-MainBgThree text-[1.5dvh] text-white">
                            {item?.notif}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="mt-[50%] text-[1.7dvh] text-gray-700">{t('NoStoriesFound')}</p>
            )}
          </div>
        </div>
      </div>
      <StoryComponent setOpen={setOpen} open={open} />
      <AddStoryComponent open={AddStoryDialog} />
    </React.Fragment>
  );
};

export default Index;
