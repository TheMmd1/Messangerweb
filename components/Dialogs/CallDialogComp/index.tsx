'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import { setCallDialog } from '@/store/slices/CallDialogSlice';
import { Dialog } from '@material-tailwind/react';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// بخش اضافه کردن تایپ ها
interface DialogSliceType {
  CallDialogSlice: boolean;
}

const Index = () => {
  // اضافه کردن state ها و سایر tools ها
  const dialog = useSelector((state: DialogSliceType) => state.CallDialogSlice);
  const dispatch = useDispatch();
  const [mic, setMic] = useState<boolean>(true);
  const [speaker, setSpeaker] = useState<boolean>(true);

  return (
    // @ts-ignore
    <Dialog
      size={'xs'}
      open={dialog}
      handler={() => dispatch(setCallDialog(!dialog))}
      className="relative max-h-[100dvh] min-h-[90dvh] rounded-3xl p-6"
    >
      <Image
        className="absolute left-0 right-0 top-0 h-[50%] rounded-t-3xl object-cover"
        src={'/images/call/call-profile.png'}
        width={1200}
        height={1200}
        alt="user image"
      />
      <div className="box-shadow absolute bottom-0 left-0 right-0 flex h-[55%] flex-col items-center justify-center gap-y-[1dvh] rounded-b-3xl rounded-t-[30px] bg-MainBgTwo">
        <div className="flex flex-col items-center justify-center gap-y-[1dvh]">
          <p className="font-IranYekanDemiBold text-center text-[20px]">بیژن شمشیری</p>
          <p className="font-IranYekanMedium text-center text-[15px]">در حال تماس</p>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-y-4">
          <div className="flex items-center justify-around gap-x-4">
            <div className="flex h-[10dvh] max-h-[5.5rem] w-[10dvh] max-w-[5.5rem] items-center justify-center rounded-full bg-[#C5E0D3]">
              <Image className="h-[50%] w-[50%]" src={'/svg/call/video.svg'} width={50} height={50} alt="video icon" />
            </div>
            <div className="flex h-[10dvh] max-h-[5.5rem] w-[10dvh] max-w-[5.5rem] items-center justify-center rounded-full bg-[#C5E0D3]">
              <Image className="h-[50%] w-[50%]" src={'/svg/call/blue_tooth.svg'} width={50} height={50} alt="video icon" />
            </div>
            <div
              onClick={() => setSpeaker(!speaker)}
              className="flex h-[10dvh] max-h-[5.5rem] w-[10dvh] max-w-[5.5rem] items-center justify-center rounded-full bg-[#C5E0D3]"
            >
              <Image
                className="h-[50%] w-[50%]"
                src={speaker ? '/svg/call/speaker.svg' : '/svg/call/mute_speaker.svg'}
                width={50}
                height={50}
                alt="video icon"
              />
            </div>
          </div>
          <div className="flex items-center justify-around gap-x-4">
            <div
              onClick={() => setMic(!mic)}
              className="flex h-[10dvh] max-h-[5.5rem] w-[10dvh] max-w-[5.5rem] items-center justify-center rounded-full bg-[#C5E0D3]"
            >
              <Image
                className="h-[5.5dvh] w-[70%] text-[#38A271]"
                src={mic ? '/svg/call/mic.svg' : '/svg/call/mute_mic.svg'}
                width={50}
                height={50}
                alt="video icon"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <div
            onClick={() => dispatch(setCallDialog(false))}
            className="box-shadow-end-call flex h-[10dvh] max-h-[5.5rem] w-[10dvh] max-w-[5.5rem] cursor-pointer items-center justify-center rounded-full bg-[#D92626] transition-all duration-300 hover:bg-[#bb3232]"
          >
            <Image className="h-[70%] w-[70%]" src={'/svg/call/end_call.svg'} width={50} height={50} title="End Call" alt="End Call Icon" />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Index;
