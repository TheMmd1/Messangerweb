'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import { setNewImageDoc } from '@/store/slices/ImageDocDIalog';
import { Dialog } from '@material-tailwind/react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

// بخش اضافه کردن تایپ ها
interface ImageDoc {
  ImageDocDialog: boolean;
}

const Index = () => {
  // اضافه کردن state ها و سایر tools ها
  const dispatch = useDispatch();
  const ImageDoc = useSelector((state: ImageDoc) => state.ImageDocDialog);

  return (
    <Dialog
      onPointerEnterCapture=""
      onPointerLeaveCapture=""
      placeholder=""
      className="flex h-full items-center justify-center bg-transparent shadow-none"
      handler={() => dispatch(setNewImageDoc(!ImageDoc))}
      size="sm"
      open={ImageDoc}
    >
      <div className="relative w-full">
        <div className="absolute top-0 z-[99999] flex w-full items-center justify-between sm:px-[25px] sm:pt-[15px]">
          <Image
            onClick={() => dispatch(setNewImageDoc(false))}
            width={35}
            height={35}
            className="cursor-pointer"
            src="/svg/homePage/lang/close-svgrepo-com.svg"
            alt="close icon"
          />
        </div>
        <Image
          width={1200}
          height={1200}
          className="cursor-pointer"
          src="/images/docs/profile-media.webp"
          alt="close icon"
        />
      </div>
    </Dialog>
  );
};

export default Index;
