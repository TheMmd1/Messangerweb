"use client";

import Image from "next/image";
import { Switch } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import BackButton from "@/components/BackButton/BackButton";
import { handleBack } from "@/store/slices/ChangeSilde";
import { useTranslation } from "react-i18next";

// کامپوننت تنظیمات کانال
const Index = () => {
  // برای مدیریت استیت های گلوبالی
  const dispatch = useDispatch();
  // برای دوزبانه کردن
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-start bg-MainBgThree">
      <header className="flex h-[8dvh] w-full items-center justify-end">
        <nav
          className={`flex w-full items-center justify-between px-5 ${localStorage.getItem("lang") === "fa" ? "ltr-custome" : "rtl-custome"}`}
        >
          <BackButton />
          <p className="font-IranYekanBold text-[1.5dvh] text-white">
            {t("Channel_Manager_Settings")}
          </p>
          <span className="w-[35px]"></span>
        </nav>
      </header>
      <section className="box-shadow rtl-custome relative flex h-[calc(100dvh-8dvh)] w-full items-start justify-center rounded-t-[30px] bg-MainBgTwo pt-4">
        <div className="relative flex h-full w-full flex-col items-center justify-start gap-y-4">
          <div className="flex h-[11dvh] w-[90%] items-center justify-start gap-x-5 rounded-[20px] bg-MainBgOne px-3 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.1)]">
            <Image
              width={55}
              height={55}
              className="h-[8dvh] w-[8dvh] rounded-full object-cover object-top"
              src={"/svg/default_profile/user-profile.svg"}
              alt="icon image"
            />
            <div className="flex flex-col items-start justify-center gap-y-2">
              <p className="font-IranYekanBold text-[1.9dvh] text-MainTextOne">
                {/* نامی که بعدا باید اضافه بشه */}
              </p>
              <p className="font-IranYekanMedium text-[1.4dvh] text-MainTextTwo">
                {/* بخش آنلاین بودن ادمین */}
              </p>
            </div>
          </div>
          <div className="flex w-[90%] flex-col items-center justify-center rounded-[20px] bg-MainBgOne px-3 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
            <p className="font-IranYekanBold flex w-full items-center justify-start px-5 pb-2 pt-5 text-[2dvh] text-[#38A271]">
              {t("What_access_administrator")}
            </p>
            <div className="flex w-full flex-col items-center justify-start gap-y-[2dvh] p-5">
              <div className="flex w-full items-center justify-between">
                <p className="font-IranYekanBold text-[1.8dvh] text-MainTextOne">
                  {t("Change_channel_information")}
                </p>
                <Switch
                  className="h-full w-full outline-none checked:bg-[#2ec946]"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </div>
              <span className="h-[2px] w-full bg-[#C5E0D3]"></span>
              <div className="flex w-full items-center justify-between">
                <p className="font-IranYekanBold text-[1.8dvh] text-MainTextOne">
                  {t("send_post")}
                </p>
                <Switch
                  className="h-full w-full outline-none checked:bg-[#2ec946]"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </div>
              <span className="h-[2px] w-full bg-[#C5E0D3]"></span>
              <div className="flex w-full items-center justify-between">
                <p className="font-IranYekanBold text-[1.8dvh] text-MainTextOne">
                  {t("Edit_other_people_messages")}
                </p>
                <Switch
                  className="h-full w-full outline-none checked:bg-[#2ec946]"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </div>
              <span className="h-[2px] w-full bg-[#C5E0D3]"></span>
              <div className="flex w-full items-center justify-between">
                <p className="font-IranYekanBold text-[1.8dvh] text-MainTextOne">
                  {t("delete_other_people_messages")}
                </p>
                <Switch
                  className="h-full w-full outline-none checked:bg-[#2ec946]"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </div>
              <span className="h-[2px] w-full bg-[#C5E0D3]"></span>
              <div className="flex w-full items-center justify-between">
                <p className="font-IranYekanBold text-[1.8dvh] text-MainTextOne">
                  {t("inviting_users_via_link")}
                </p>
                <Switch
                  className="h-full w-full outline-none checked:bg-[#2ec946]"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </div>
              <span className="h-[2px] w-full bg-[#C5E0D3]"></span>
              <div className="flex w-full items-center justify-between">
                <p className="font-IranYekanBold text-[1.8dvh] text-MainTextOne">
                  {t("Video_chat_management")}
                </p>
                <Switch
                  className="h-full w-full outline-none checked:bg-[#2ec946]"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </div>
              <span className="h-[2px] w-full bg-[#C5E0D3]"></span>
              <div className="flex w-full items-center justify-between">
                <p className="font-IranYekanBold text-[1.8dvh] text-MainTextOne">
                  {t("add_new_admin")}
                </p>
                <Switch
                  className="h-full w-full outline-none checked:bg-[#2ec946]"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </div>
            </div>
          </div>
        </div>
        {/* fixed button */}
        <div
          onClick={() => dispatch(handleBack())}
          className="shadoow-3D ltr-custome fixed bottom-5 right-3 flex h-[50px] cursor-pointer items-center justify-start gap-x-2 rounded-2xl bg-MainBgThree pl-8 pr-3 transition-all duration-200 hover:bg-[#4eb887]"
        >
          <p className="font-IranYekanDemiBold text-[2dvh] text-white">
            {t("save")}
          </p>
          <Image
            width={30}
            height={30}
            className="-mb-1 h-[4dvh] w-[4dvh] object-contain"
            src={"/svg/channel/tik.svg"}
            alt="next arrow Icon"
          />
        </div>
      </section>
    </div>
  );
};

export default Index;
