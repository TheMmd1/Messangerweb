"use client";

import Image from "next/image";
import DeleteDialog from "../../Dialogs/DeleteItemDialog/Index";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addSlide } from "@/store/slices/ChangeSilde";
import BackButton from "@/components/BackButton/BackButton";
import { useTranslation } from "react-i18next";

const Index = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [deleteOrganizationDialog, setDeleteOrganizationDialog] =
    useState(false);
  return (
    <>
      <main className="flex h-full min-h-[100dvh] w-full items-start justify-center bg-[#929292]">
        <div className="flex h-full min-h-[100dvh] w-full items-start justify-center bg-MainBgThree">
          <div className="flex h-full w-full flex-col items-start justify-center">
            {/* header */}
            <header className="flex h-[8dvh] w-full items-center justify-end">
              <nav
                className={`flex w-full items-center justify-between px-5 ${localStorage.getItem("lang") === "fa" ? "ltr-custome" : "rtl-custome"}`}
              >
                <BackButton />
                <p className="text-center font-IranYekanBold text-[12px] text-white md:text-[16px]">
                  {t("group or organization setting")}
                </p>
                <div className="flex w-[5rem] items-center justify-end gap-x-2"></div>
              </nav>
            </header>
            {/* page content */}
            <div className="box-shadow flex h-full w-full flex-col items-center justify-start rounded-t-[30px] bg-MainBgTwo pt-3">
              <div className="your-component-scrollbar ltr-custome flex h-[calc(100dvh-8dvh)] w-[92%] flex-col items-center justify-start pb-28">
                <div className="rtl-custome mt-6 flex w-[95%] cursor-pointer items-center justify-start gap-x-3 rounded-3xl bg-MainBgOne p-4">
                  <Image
                    className="h-[60px] w-[60px] rounded-full object-cover object-top"
                    src={"/svg/default_profile/user-profile.svg"}
                    width={60}
                    height={60}
                    alt="add person"
                  />
                  <div className="flex flex-col items-start justify-center gap-y-3">
                    <p className="font-IranYekanBold text-MainTextOne">
                      {t("group or organization name")}
                    </p>
                    <div className="flex items-center justify-center gap-x-3 font-IranYekanDemiBold">
                      <p className="text-[14px] text-MainTextTwo">
                        {t("organization")}
                      </p>
                      <span className="h-[.8rem] w-[1px] bg-[#606060]"></span>
                      <p className="text-[14px] text-MainTextTwo">
                        {t("2groups")}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => dispatch(addSlide("groupMember"))}
                  className="rtl-custome mt-6 flex w-[95%] cursor-pointer items-center justify-between rounded-3xl bg-MainBgOne py-3 pl-5 pr-3"
                >
                  <div className="flex items-center justify-start gap-x-3">
                    <div className="flex h-[55px] w-[55px] items-center justify-center rounded-full bg-MainBgThree">
                      <Image
                        className="h-[26px] w-[26px] object-cover"
                        src={"/svg/newGroup/addIcon.svg"}
                        width={26}
                        height={26}
                        alt="add person"
                      />
                    </div>
                    <p className="font-IranYekanMedium text-MainTextOne">
                      {t("invite_users")}
                    </p>
                  </div>
                  <Image
                    width={20}
                    height={20}
                    className="h-[12px] w-[12px] object-contain"
                    src={"/svg/Setting/arrowLeftLittle.svg"}
                    alt="icon image"
                  />
                </div>
                <div className="rtl-custome mt-6 flex w-[95%] flex-col items-center justify-center gap-y-3">
                  <p className="flex w-full items-center justify-start px-2 font-IranYekanDemiBold text-[15px] text-MainTextTwo">
                    {t("your_groups")}
                  </p>
                  <div className="flex w-full flex-col items-center justify-center gap-y-3 rounded-3xl bg-MainBgOne p-4">
                    <div className="flex w-full items-center justify-between gap-x-3">
                      <div className="flex items-center justify-start gap-x-3">
                        <Image
                          className="h-[60px] w-[60px] rounded-full object-cover object-top"
                          src={"/svg/default_profile/user-profile.svg"}
                          width={60}
                          height={60}
                          alt="add person"
                        />
                        <div className="flex flex-col items-start justify-center gap-y-3">
                          <p className="font-IranYekanBold text-MainTextOne">
                            نام گروه اول
                          </p>
                          <p className="text-[14px] text-MainTextTwo">
                            آخرین پیام این گروه
                          </p>
                        </div>
                      </div>
                      <div className="flex h-[2.3rem] flex-col items-center justify-start">
                        <p className="text-MainTextTwo">۱۲:۲۱</p>
                      </div>
                    </div>
                    <span className="h-[1px] w-full bg-[#C5E0D3]"></span>
                    <div className="flex w-full items-center justify-between gap-x-3">
                      <div className="flex items-center justify-start gap-x-3">
                        <Image
                          className="h-[60px] w-[60px] rounded-full object-cover object-top"
                          src={"/svg/default_profile/user-profile.svg"}
                          width={60}
                          height={60}
                          alt="add person"
                        />
                        <div className="flex flex-col items-start justify-center gap-y-3">
                          <p className="font-IranYekanBold text-MainTextOne">
                            نام گروه دوم
                          </p>
                          <p className="text-[14px] text-MainTextTwo">
                            نمایش آخرین پیام این گروه
                          </p>
                        </div>
                      </div>
                      <div className="flex h-[2.3rem] flex-col items-center justify-start">
                        <p className="text-MainTextTwo">۱۲:۲۱</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rtl-custome mt-6 flex w-[95%] flex-col items-center justify-center gap-y-3">
                  <p className="flex w-full items-center justify-start px-2 font-IranYekanDemiBold text-[15px] text-MainTextTwo">
                    {t("other_groups")}
                  </p>
                  <div
                    onClick={() => dispatch(addSlide("addNewGroup"))}
                    className="flex w-full cursor-pointer items-center justify-between rounded-3xl bg-MainBgOne py-3 pl-5 pr-3"
                  >
                    <div className="flex cursor-pointer items-center justify-start gap-x-3">
                      <div className="flex h-[55px] w-[55px] items-center justify-center rounded-full bg-MainBgThree">
                        <Image
                          className="h-[26px] w-[26px] object-contain"
                          src={"/svg/newGroup/addGroup.svg"}
                          width={26}
                          height={26}
                          alt="add person"
                        />
                      </div>
                      <p className="font-IranYekanDemiBold text-MainTextOne">
                        {t("Add_group")}
                      </p>
                    </div>
                    <Image
                      width={20}
                      height={20}
                      className="h-[12px] w-[12px] object-contain"
                      src={"/svg/Setting/arrowLeftLittle.svg"}
                      alt="icon image"
                    />
                  </div>
                </div>
                <div className="rtl-custome mt-6 flex w-[95%] flex-col items-center justify-center rounded-3xl bg-MainBgOne py-3 pl-5 pr-3">
                  <div className="flex w-full flex-col items-center justify-center gap-y-3 rounded-3xl bg-MainBgOne px-4 py-2">
                    <div
                      onClick={() => setDeleteOrganizationDialog(true)}
                      className="flex w-full cursor-pointer items-center justify-start gap-x-10 py-2"
                    >
                      <Image
                        className="h-[20px] w-[20px] object-contain"
                        src={"svg/newGroup/exit.svg"}
                        width={20}
                        height={20}
                        alt="add person"
                      />
                      <p className="font-IranYekanDemiBold text-[#D92626]">
                        {t("leaving_organization")}
                      </p>
                    </div>
                    <span className="h-[1px] w-full bg-[#C5E0D3]"></span>
                    <div
                      onClick={() =>
                        toast.warning("گزارش شما برای این سازمان ارسال شد.")
                      }
                      className="flex w-full cursor-pointer items-center justify-start gap-x-10 py-2"
                    >
                      <Image
                        className="h-[20px] w-[20px] object-contain"
                        src={"svg/userInfo/flag.svg"}
                        width={20}
                        height={20}
                        alt="add person"
                      />
                      <p className="font-IranYekanDemiBold text-[#D92626]">
                        {t("report_organization")}
                      </p>
                    </div>
                    <span className="h-[1px] w-full bg-[#C5E0D3]"></span>
                    <div
                      onClick={() => dispatch(addSlide("disableGroup"))}
                      className="flex w-full cursor-pointer items-center justify-start gap-x-10 py-2"
                    >
                      <Image
                        className="h-[20px] w-[20px] object-contain"
                        src={"svg/userInfo/block.svg"}
                        width={20}
                        height={20}
                        alt="add person"
                      />
                      <p className="font-IranYekanDemiBold text-[#D92626]">
                        {t("disable_organization")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DeleteDialog
          setOpen={setDeleteOrganizationDialog}
          open={deleteOrganizationDialog}
          text="آیا میخواهید از این سازمان خارج شوید؟"
        />
      </main>
    </>
  );
};

export default Index;
