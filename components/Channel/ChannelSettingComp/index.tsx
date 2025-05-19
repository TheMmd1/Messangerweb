"use client";

// اضافه کردن کامپوننت ها و پکیج ها
import Image from "next/image";
import { Radio } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BackButton from "@/components/BackButton/BackButton";
import { addSlide } from "@/store/slices/ChangeSilde";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [sampleLink, setSampleLink] = useState<string>("link");
  const [publicLink, setPublicLink] = useState<string>("");

  useEffect(() => {
    if (publicLink !== "") {
      setSampleLink("");
    } else {
      setSampleLink("link");
    }
  }, [publicLink]);

  return (
    <div className="rtl-custome flex min-h-[100dvh] w-full flex-col items-center justify-start bg-MainBgThree">
      <header className="flex h-[8dvh] w-full items-center justify-end">
        <nav className={`flex w-full items-center justify-between px-5 ${localStorage.getItem('lang') === 'fa' ? 'rtl-custome' : 'ltr-custome'}`}>
          <span className="w-[35px]"></span>
          <p className="font-YekanBakhFaNum text-[2dvh] text-white">{t('channel_setting')}</p>
          <BackButton />
        </nav>
      </header>
      <section className="box-shadow relative flex h-[calc(100dvh-8dvh)] w-full flex-col items-center justify-center rounded-t-[30px] bg-MainBgTwo p-4 pt-4">
        <div className="your-component-scrollbar relative mb-[4rem] flex w-full flex-1 flex-col items-center justify-start gap-y-4">
          <div className="flex w-full flex-col items-start justify-start gap-y-5 rounded-3xl bg-MainBgOne p-4">
            <p className="font-IranYekanDemiBold mb-3 mt-1 flex w-full items-center justify-start text-[#38A271]">{t('channel_type')}</p>
            <div className="flex items-start justify-start">
              <div className="-mt-[13px]">
                <Radio
                  name="status"
                  color="green"
                  ripple={true}
                  crossOrigin={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              </div>
              <div className="flex flex-col items-start justify-start gap-x-1 gap-y-2">
                <p className="font-YekanBakhFaNum text-MainTextOne">{t('public_channel')}</p>
                <p className="font-YekanBakhFaNum leading-6 text-MainTextTwo">{t('public_channel_desc')}</p>
              </div>
            </div>
            <div className="flex items-start justify-start">
              <div className="-mt-[13px]">
                <Radio
                  name="status"
                  color="green"
                  ripple={true}
                  crossOrigin={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              </div>
              <div className="flex flex-col items-start justify-center gap-x-1 gap-y-2">
                <p className="font-YekanBakhFaNum text-MainTextOne">{t('private_channel')}</p>
                <p className="font-YekanBakhFaNum leading-6 text-MainTextTwo">{t('Members can only join these channels with an invitation link')}</p>
              </div>
            </div>
          </div>
          <div className="relative flex w-full flex-col items-start justify-start gap-y-5 rounded-3xl bg-MainBgOne p-4">
            <p className="font-IranYekanDemiBold mt-1 flex w-full items-center justify-start text-[#38A271]">{t('channel_type')}</p>
            <input
              onChange={(e) => setPublicLink(e.target.value)}
              value={publicLink}
              className={`w-full border-b border-[#A0BEB0] py-3 pr-3 placeholder:font-YekanBakhFaNum placeholder:text-MainTextOne ${
                publicLink === '' ? 'pl-[138px]' : 'pl-28'
              } ltr-custome outline-none`}
              type="text"
            />
            <p className="font-IranYekanDemiBold absolute bottom-[29px] left-32 flex items-center justify-center text-[#A0BEB0]">{sampleLink}</p>
            <p className="font-IranYekanDemiBold absolute bottom-[29px] left-5 flex items-center justify-center text-[#A0BEB0]">/Persianchat.ir</p>
          </div>
          <div className="mt-5 flex flex-col items-start justify-start gap-x-5 gap-y-3">
            <p className="font-YekanBakhFaNum leading-7 text-MainTextTwo">{t('channel_desc1')}</p>
            <p className="font-YekanBakhFaNum leading-7 text-MainTextTwo">{t('channel_desc2')}</p>
            <p className="font-YekanBakhFaNum leading-7 text-MainTextTwo">{t('channel_desc3')}</p>
          </div>
        </div>
        {/* fixed button */}
        <div
          onClick={() => dispatch(addSlide('editChannel'))}
          className="shadow-[0_1px_5px_#00000024] flex h-[55px] cursor-pointer items-center justify-start gap-x-2 self-start rounded-2xl bg-MainBgThree pl-8 pr-3 transition-all duration-200 hover:bg-[#4eb887]"
        >
          <Image width={30} height={30} className="-mb-1 h-[30px] w-[30px] object-contain" src={'/svg/channel/tik.svg'} alt="next arrow Icon" />
          <p className="font-YekanBakhFaNum text-white">{t('next')}</p>
        </div>
      </section>
    </div>
  );
};

export default Index;
