import { ChatData } from '@/lib/data/Conversation';
import useSearch from '@/utils/useSearch';
import { t } from 'i18next';
import Image from 'next/image';
import React, { useEffect } from 'react'

const SearchInput = (data:ChatData[]) => {


    const { isSearchOpen, setIsSearchOpen, searchRef, iconRef, query, handleSearchChange, searchResults } = useSearch(data, 'title');

     useEffect(() => {
       if (isSearchOpen && searchRef.current) {
         searchRef.current.focus();
       }
     }, [isSearchOpen]);
     console.log(data)

  return (
    <>
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
                  value={query}
                  onChange={handleSearchChange}
                  ref={searchRef}
                  placeholder={t('search')}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSearchOpen(!isSearchOpen);
                  }}
                  type="text"
                  className={`absolute z-0 h-[20px] w-[100%] rounded-[30px] border-2 border-[#A0BEB0] py-6 pl-5 pr-14 text-[13px] outline-none transition-all duration-300 placeholder:text-xs placeholder:text-[#A0BEB0] sm:text-[1rem] md:py-7 md:pr-16`}
                />
              </div></>
  )
}

export default SearchInput