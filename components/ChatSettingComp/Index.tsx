'use client';


// اضافه کردن کامپوننت ها و پکیج ها
import { changeTheme } from '@/utils/themeHelper';
import DeleteDialog from '../Dialogs/DeleteItemDialog/Index';
import { Switch } from '@material-tailwind/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import BackButton from '../BackButton/BackButton';
import { useTranslation } from 'react-i18next';

export default function Index() {
  // ضافه کردن state ها و سایر tools ها
  const [deleteChatDialog, setDeleteChatDialog] = useState(false);
  const { t } = useTranslation();

  // تابع تغییر تم در بخش تنظیمات chat
  const themeHandler = () => {
    if (Cookies.get('theme')) {
      if (Cookies.get('theme') === '') {
        Cookies.set('theme', 'dark', { expires: 30 });
        changeTheme('dark');
      } else if (Cookies.get('theme') === 'light') {
        changeTheme('dark');
        Cookies.set('theme', 'dark', { expires: 30 });
      } else if (Cookies.get('theme') === 'dark') {
        changeTheme('light');
        Cookies.set('theme', 'light', { expires: 30 });
      }
    } else {
      Cookies.set('theme', 'dark', { expires: 30 });
      changeTheme('dark');
    }
  };


  // circles theme change

  const [currentTheme , setCurrentTheme] = useState('')

  const handleLightMode = () => {
    if (Cookies.get('theme') === "" || "dark") {
        Cookies.set('theme' , 'light' , { expires : 30});
        changeTheme('light')
        setCurrentTheme('light')
    }
  }

const handleDarkMode = () => {
  if (Cookies.get('theme') === 'light') {
    Cookies.set('theme', 'dark', { expires: 30 });
    changeTheme('dark');
    setCurrentTheme('dark')
  }
};




  // responive fixed

  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-center">
      <header className="flex h-[8dvh] w-full items-center justify-end">
        <nav className={`flex w-full items-center justify-between px-5 ${t('system_lang') === 'fa' ? 'flex-row-reverse' : 'flex-row'}`}>
          <BackButton />
          <p className="font-IranYekanBold text-[2.3dvh] text-white">{t('chat')}</p>
          <span className="w-[35px]"></span>
        </nav>
      </header>
      <section className="box-shadow relative flex h-[calc(100dvh-8dvh)] w-full items-start justify-center rounded-t-[30px] bg-MainBgTwo md:pt-4">
        <div className="w-full flex-1 p-3 md:p-10">
          <label id="changeTheme">
            <div
              className={`mt-[30px] flex ${t('system_lang') === 'fa' ? 'flex-row-reverse' : 'flex-row'} h-[8dvh] cursor-pointer items-center justify-between rounded-[10px] bg-MainBgOne px-5 py-3 shadow-[0_1px_5px_#00000024] md:h-[9dvh]`}
            >
              {/* Theme circles */}

              <div className="flex h-auto md:w-[13dvh] w-[10dvh] items-center justify-between gap-[2px]">
                <div
                  className={`rounded-full border-2 transition-colors duration-300 ease-out ${currentTheme === 'dark' ? 'border-gray-500' : 'border-green-900'} p-[2px]`}
                  onClick={handleLightMode}
                >
                  <div className="md:h-[5dvh] md:w-[5dvh] h-[3.8dvh] w-[3.8dvh] rounded-full bg-green-100"></div>
                </div>

                <div
                  className={`rounded-full border-2 transition-colors duration-300 ease-out ${currentTheme === 'dark' ? 'border-green-900' : 'border-gray-500'} p-[2px]`}
                  onClick={handleDarkMode}
                >
                  <div className="md:h-[5dvh] md:w-[5dvh] h-[3.8dvh] w-[3.8dvh] rounded-full bg-black"></div>
                </div>
              </div>
              {/* <Switch
                onChange={themeHandler}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                className="h-full w-full outline-none checked:border checked:border-[#2ec946] checked:bg-[#2ec946]"
              /> */}
              <p className="text-[1.5dvh] text-textChat md:text-[1.7dvh]">{t('change_theme')}</p>
            </div>
          </label>

          <div>
            <label id="saveTogallery">
              <div
                className={`mt-[30px] flex ${t('system_lang') === 'fa' ? 'flex-row-reverse' : 'flex-row'} md:h-[9dvh]-pointer h-[8dvh] items-center justify-between rounded-[10px] bg-MainBgOne px-5 py-3 shadow-[0_1px_5px_#00000024]`}
              >
                <Switch
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                  className="h-full w-full outline-none checked:border checked:border-[#2ec946] checked:bg-[#2ec946]"
                />
                <p className="text-[1.5dvh] text-textChat md:text-[1.7dvh]">{t('save_in_gallery')}</p>
              </div>
            </label>
            <p className="rtl-custome mt-6 text-center text-[1.4dvh] text-gray-700 md:text-[1.6dvh]">
              {t('Automatically_save_photos_to_the_gallery')}
            </p>
          </div>
          <div>
            <label id="keepConversationInTheArchive">
              <div
                className={`mt-[30px] flex ${t('system_lang') === 'fa' ? 'flex-row-reverse' : 'flex-row'} h-[8dvh] cursor-pointer items-center justify-between rounded-[10px] bg-MainBgOne px-5 py-3 shadow-[0_1px_5px_#00000024] md:h-[9dvh]`}
              >
                <Switch
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                  className="h-full w-full outline-none checked:border checked:border-[#2ec946] checked:bg-[#2ec946]"
                />
                <p className={`rtl-custome ${t('system_lang') === 'fa' ? '' : 'mr-5 leading-5'} text-[1.5dvh] text-textChat md:text-[1.7dvh]`}>
                  {t('Keeping_conversations_in_the_archive')}
                </p>
              </div>
            </label>
            <p className="rtl-custome mt-5 px-6 text-center text-[1.4dvh] md:pt-1 leading-5 text-gray-700 md:mt-3 md:text-[1.6dvh]">{t('archive_desc')}</p>
          </div>
          <div
            onClick={() => setDeleteChatDialog(true)}
            className={`rtl-custome mt-[30px] flex ${t('system_lang') === 'fa' ? 'flex-row' : 'flex-row-reverse'} h-[8dvh] cursor-pointer items-center justify-center rounded-[10px] bg-MainBgOne px-5 py-3 shadow-[0_1px_5px_#00000024] md:h-[9dvh]`}
          >
            <p className="text mt-3 text-[1.5dvh] text-red-500 md:text-[2dvh]">{t('deleting_messages')}</p>
          </div>
        </div>
      </section>
      <DeleteDialog open={deleteChatDialog} setOpen={setDeleteChatDialog} text={t('delete_message_alert')} />
    </div>
  );
}
