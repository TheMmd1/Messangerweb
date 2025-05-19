'use client';
// اضافه کردن کامپوننت ها و پکیج ها
import { imageDoc } from '@/lib/data/imageDoc';
import ImageDocDialog from '../../Dialogs/DocDialog';
import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewImageDoc } from '@/store/slices/ImageDocDIalog';
import { Messages } from '@/store/slices/AccountInformationSlice';
import useMediaItems from '@/utils/useMediaItems';

interface AccountInfoType {
  accountInfo: {
    user_messages: Messages[];
  };
}

const Index = () => {
  // اضافه کردن state ها و سایر tools ها
  const dispatch = useDispatch();

  const { user_messages } = useSelector((state: AccountInfoType) => state.accountInfo);
  const { imagesItem } = useMediaItems(user_messages);

  return (
    <React.Fragment>
      <div className="your-component-scrollbar rtl-custome grid h-[100dvh] w-full grid-cols-4 pb-32">
        {imagesItem.map((item, index) => {
          return (
            <div key={item.fileId} className={`mt-8 px-7 ${index + 1 === imageDoc.length && 'pb-12'}`}>
              <Image
                onClick={() => dispatch(setNewImageDoc(true))}
                className="h-[80px] w-[80px] cursor-pointer rounded-2xl object-cover"
                width={150}
                height={150}
                src={item.url}
                alt="chat image"
              />
            </div>
          );
        })}
      </div>
      <ImageDocDialog />
    </React.Fragment>
  );
};

export default Index;
