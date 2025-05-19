"use client";

import { handleBack } from "@/store/slices/ChangeSilde";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

export default function BackButton() {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  // دکمه برگشت برای کل بخش‌های سایدبار. چون اکثر جاها استفاده شده است
  return (
    <div
      onClick={() => dispatch(handleBack())}
      className={`flex w-[35px] items-center ${t("system_lang") === "en" ? "rotateYMenu justify-end" : "justify-start"}`}
    >
      <Image
        width={35}
        height={30}
        className="h-[2.5dvh] w-[2.5dvh] cursor-pointer object-contain"
        src={"/svg/Setting/arrowLeft.svg"}
        alt="icon image"
      />
    </div>
  );
}
