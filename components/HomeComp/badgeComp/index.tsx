'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import { setAddStoryDialog } from '@/store/slices/AddStorySlice';
import { addSlide } from '@/store/slices/ChangeSilde';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

const Index = ({ tab }: { tab: number }) => {
  // اضافه کردن state ها و سایر tools ها
  const dispatch = useDispatch();

  // responsive div and image
  return (
    <>
      {tab === 1 || tab === 4 || tab === 3 ? (
        <div className="absolute bottom-6 left-5 z-[200] flex flex-row-reverse items-center justify-center gap-x-4">
          <div
            onClick={() => dispatch(addSlide('newChat'))}
            className="flex h-[7dvh] w-[7dvh] md:h-[9dvh]  md:w-[9dvh] cursor-pointer items-center justify-center rounded-full bg-MainBgThree shadow-[0px_7px_15px_6px_rgba(0,0,0,0.22)]"
          >
            <Image
              src={'/svg/homePage/Conversation/message.svg'}
              className="-mb-1 h-[5dvh] w-[5dvh] md:h-[6dvh] md:w-[6dvh] object-contain"
              width={50}
              height={50}
              alt="badge image"
            />
          </div>
        </div>
      ) : (
        tab === 2 && (
          <div
            onClick={() => dispatch(setAddStoryDialog(true))}
            className="absolute bottom-6 left-5 z-[200] flex flex-row-reverse items-center justify-center gap-x-4"
          >
            <div className="flex w-[7dvh] h-[7dvh]  md:h-[7dvh] md:w-[9dvh] cursor-pointer items-center justify-center rounded-full bg-MainBgTwo shadow-[0px_7px_15px_6px_rgba(0,0,0,0.2)]">
              <Image
                src={'/svg/homePage/Story/plusBadge.svg'}
                className="h-[4dvh] w-[4dvh] md:h-[5dvh] md:w-[5dvh] object-contain"
                width={50}
                height={50}
                alt="badge image"
              />
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Index;
