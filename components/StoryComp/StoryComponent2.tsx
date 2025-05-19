import Stories from "stories-react";
import "stories-react/dist/index.css";
import { Dialog } from "@material-tailwind/react";
import storyItems from "../../lib/data/StoryItemd.json";
// Import Swiper styles
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

interface StoryComponentProp {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const StoryComponent = ({ open, setOpen }: StoryComponentProp) => {
  const handleStoryChange = (currentIndex: number) => {
    if (currentIndex === storyItems.length - 1) {
      const lastSlideDuration = storyItems[currentIndex].duration;

      setTimeout(() => {
        setOpen(false);
      }, lastSlideDuration);
    }
  };
  return (
    <Dialog
      onPointerEnterCapture=""
      onPointerLeaveCapture=""
      placeholder=""
      handler={() => setOpen(!open)}
      size="sm"
      open={open}
    >
      <div className="relative h-[100dvh] w-full">
        <div className="absolute top-0 z-[99999] flex w-full items-center justify-between sm:px-[25px] sm:pt-[35px]">
          <div className="flex items-center">
            <div className="mr-[14px] flex items-center gap-[12px]">
              <Image
                width={1000}
                height={1000}
                className="h-[60px] w-[60px] rounded-full border border-[#F6F6F6] bg-white object-cover object-top shadow-xl"
                src="/svg/default_profile/user-profile.svg"
                alt=""
              />
              <div className="text-white">
                <p className="text-[16px] font-bold">محسن حبیبی</p>
                <p className="text-[10px]">امروز، ۰۹:۰۴</p>
              </div>
            </div>
          </div>
          <Image
            onClick={() => setOpen(false)}
            width={35}
            height={35}
            className="cursor-pointer shadow-lg"
            src="/svg/homePage/lang/close-svgrepo-com.svg"
            alt="close icon"
          />
        </div>
        <div className="h-full w-full">
          <Stories
            height="100dvh"
            width="100%"
            stories={storyItems}
            onStoryChange={handleStoryChange}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default StoryComponent;
