import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store'; // Update this path based on your project
import Image from 'next/image';
import i18n from '@/i18n';
import { addSlide } from '@/store/slices/ChangeSilde';
import { setSelectedGroup } from '@/store/slices/GroupSlice';


const Index = () => {

  const { t } = i18n;
  const dispatch = useDispatch();
  const groups = useSelector((state: RootState) => state.groups.groups);
    
  return (
    <div className="md:item-start your-component-scrollbar mb-5 flex h-[100dvh] w-full flex-col items-center justify-start pb-[30dvh]">
      {groups.length === 0 ? (
        <p className="absolute top-1/2 text-[1.7dvh] text-gray-700">{t('NoGroupAvailable')}</p>
      ) : (
        groups.map((item, index) => (
          <div
            key={index}
            className="relative flex min-h-[10dvh] w-full cursor-pointer items-center justify-start border-b border-[#C5E0D3] px-2 transition-all duration-200 hover:bg-MainBgTwo sm:px-3"
          >
            <div className="flex w-[80%] gap-3">
              <div onClick={() => { dispatch(addSlide('GroupDetail')); dispatch(setSelectedGroup(item)); }}>
                {item.image ? (
                  <Image src={item.image} alt={item.name} width={50} height={50} className="h-[6dvh] w-[6dvh] rounded-full" />
                ) : (
                  <div className="flex h-[6dvh] w-[6dvh] items-center justify-center rounded-full bg-yellow-600">{item.name.trim().charAt(0)}</div>
                )}
              </div>
              <div className="flex flex-col justify-between py-[0.5rem]">
                <p className="font-IranYekanBold text-[1.7dvh] text-MainTextOne">{item.name}</p>
                <p className="overflow-hidden text-ellipsis text-nowrap text-[1.3dvh] text-MainTextTwo">messages</p>
              </div>
            </div>
            <div className="flex w-[20%] items-end justify-end text-[11px] text-[#ACACAC]"> 12:32 </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Index