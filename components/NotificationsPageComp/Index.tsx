'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import BackButton from '../BackButton/BackButton';
import { Switch } from '@material-tailwind/react';
import { handleBack } from '@/store/slices/ChangeSilde';

export default function Index() {
  // اضافه کردن state ها و سایر tools ها
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [groupReactions, setGroupReactions] = useState(false);
  const [messageReactions, setMessageReactions] = useState(false);
  const [groupNotifications, setGroupNotifications] = useState(false);
  const [messageNotifications, setMessageNotifications] = useState(false);

  // تابع ریست کردن نوتیف ها
  const resetNotifications = () => {
    setMessageNotifications(false);
    setMessageReactions(false);
    setGroupNotifications(false);
    setGroupReactions(false);
  };

  return (
    <div className="relative flex h-[100dvh] w-full items-center justify-center bg-MainBgOne">
      <div className={`flex h-full w-full flex-col items-center justify-start bg-MainBgThree`}>
        <header className="flex md:h-[8dvh] h-[5.5dvh]  w-full items-center justify-end">
          <nav className={`flex w-full items-center justify-between px-5 ${t('system_lang') === 'fa' ? 'ltr-custome' : 'rtl-custome'}`}>
            <BackButton />
            <p className="font-IranYekanBold text-[2dvh] text-white">{t('notifications')}</p>
            <span className="w-[20px]"></span>
          </nav>
        </header>

        <section
          className={`relative flex h-[calc(100dvh-8dvh)] w-full flex-1 flex-col items-center justify-start rounded-t-[30px] bg-MainBgTwo px-6 py-4  ${t('system_lang') === 'fa' ? 'rtl-custome' : 'ltr-custome'}`}
        >
          <div className={`w-full flex-1`}>
            <div className="mb-5 w-full">
              <p className="font-IranYekanDemiBold mb-6 mt-3">{t('message_notifications')}</p>
              <div className="divide-y divide-solid rounded-[10px] bg-MainBgOne shadow-[0_1px_5px_#00000024]">
                <label id="showNotif">
                  <div className="flex md:h-[8dvh] h-[5.5dvh]  items-center justify-between p-4">
                    <p className="text-[1.5dvh] md:text-[1.7dvh]">{t('show_notifications')}</p>
                    <Switch
                      id="showNotif"
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      crossOrigin={undefined}
                      className="h-full w-full outline-none checked:border checked:border-[#2ec946] checked:bg-[#2ec946]"
                      checked={messageNotifications}
                      onChange={() => setMessageNotifications(!messageNotifications)}
                    />
                  </div>
                </label>
                <div className="flex md:h-[8dvh] h-[5.5dvh]  items-center justify-between p-4">
                  <p className="text-[1.5dvh] md:text-[1.7dvh]">{t('sounds')}</p>
                  <p className="text-[1.5dvh] md:text-[1.7dvh]">{t('default')}</p>
                </div>
                <label id="msgReaction">
                  <div className="flex md:h-[8dvh] h-[5.5dvh]  items-center justify-between p-4">
                    <p className="text-[1.5dvh] md:text-[1.7dvh]">{t('reaction')}</p>
                    <Switch
                      id="msgReaction"
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      crossOrigin={undefined}
                      className="h-full w-full outline-none checked:bg-[#2ec946]"
                      checked={messageReactions}
                      onChange={() => setMessageReactions(!messageReactions)}
                    />
                  </div>
                </label>
              </div>
            </div>

            <div className="mb-5 w-full">
              <p className="font-IranYekanDemiBold my-3"></p>
              <div className="divide-y divide-solid rounded-[10px] bg-MainBgOne shadow-[0_1px_5px_#00000024]">
                <label id="grpNotif">
                  <div className="flex items-center justify-between p-4">
                    <p className="text-[1.5dvh] md:text-[1.7dvh]">{t('show_notifications')}</p>
                    <Switch
                      id='grpNotif'
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      crossOrigin={undefined}
                      className="h-full w-full outline-none checked:bg-[#2ec946]"
                      checked={groupNotifications}
                      onChange={() => setGroupNotifications(!groupNotifications)}
                    />
                  </div>
                </label>
                <div className="flex items-center justify-between p-4">
                  <p className="text-[1.5dvh] md:text-[1.7dvh]">{t('sounds')}</p>
                  <p className="text-[1.5dvh] md:text-[1.7dvh]">{t('default')}</p>
                </div>
                <label id="grpReaction">
                  <div className="flex items-center justify-between p-4">
                    <p className="text-[1.5dvh] md:text-[1.7dvh]">{t('reaction')}</p>
                    <Switch
                      id="grpReaction"
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      crossOrigin={undefined}
                      className="h-full w-full outline-none checked:bg-[#2ec946]"
                      checked={groupReactions}
                      onChange={() => setGroupReactions(!groupReactions)}
                    />
                  </div>
                </label>
              </div>
            </div>

            <div
              onClick={resetNotifications}
              className="flex w-full cursor-pointer items-center gap-4 rounded-[10px] bg-MainBgOne px-5 py-4 shadow-[0_1px_5px_#00000024]"
            >
              <Image src="/svg/homePage/HambergerMenu/refresh-cw-alt-1-svgrepo-com.svg" width={25} height={25} alt="Reset Icon" />
              <p className="text-[1.5dvh] text-red-500 md:text-[1.7dvh]">{t('reset_notification_settings')}</p>
            </div>
          </div>
        </section>
        <div className="flex w-full items-center justify-start bg-MainBgTwo px-6">
          <button
            onClick={() => dispatch(handleBack())}
            type="submit"
            className={`shadow-[0_4px_15px_rgba(0,0,0,0.1)]" my-3 flex items-center gap-2 rounded-[10px] bg-MainBgThree px-7 py-3 text-white sm:px-7 sm:py-5 xl:text-[1.1rem]`}
          >
            {t('save')}
          </button>
        </div>
      </div>
    </div>
  );
}
