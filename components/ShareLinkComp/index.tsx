'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import BackButton from '../BackButton/BackButton';
import { addSlide } from '@/store/slices/ChangeSilde';
import ResetLinkDialog from '@/components/Dialogs/ResetLink/index';

const Index = () => {
  // اضافه کردن state ها و سایر tools ها
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const ShareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'اشتراک‌گذاری لینک',
          text: 'این لینک را مشاهده کنید!',
          url: window.location.href,
        });
      } catch (error) {
        console.error('خطا در اشتراک‌گذاری:', error);
      }
    }
  };
  const handleCopyUrl = () => {
    const url = window.location.href;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success(t('link_copied_clipboard'));
      })
      .catch(() => {
        toast.success(t('error_copied_link'));
      });
  };
  return (
    <main className="flex h-full min-h-[100dvh] w-full items-start justify-center">
      <div className="flex h-full min-h-[100dvh] w-full items-start justify-center bg-MainBgThree">
        <div className="flex h-full w-full flex-col items-start justify-center">
          {/* header */}
          <header className="flex h-[8dvh] w-full items-center justify-end">
            <nav className={`flex w-full items-center justify-between px-5 ${t('system_lang') === 'fa' ? 'ltr-custome' : 'rtl-custome'}`}>
              <BackButton />
              <p className="font-IranYekanBold text-center text-[1.5dvh] leading-4 text-white md:text-[1.7dvh]">{t('invitation_link')}</p>
              <div className="flex w-[35px] items-center justify-end gap-x-2"></div>
            </nav>
          </header>
          <div className="box-shadow flex h-[calc(100dvh-8dvh)] w-full flex-col items-center justify-start rounded-t-[30px] bg-MainBgOne">
            <div className="your-component-scrollbar ltr-custome mt-[30px] flex h-full w-full flex-col items-center justify-start px-[25px] pb-12">
              <div
                className={`mt-3 flex w-full flex-col items-center justify-center gap-y-7 rounded-3xl border-2 border-gray-200 bg-MainBgOne p-5 px-5 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] ${t('system_lang') === 'fa' ? 'rtl-custome' : 'ltr-custome'}`}
              >
                <Image
                  className="mt-3 h-[10dvh] w-[10dvh] object-contain"
                  src={'/svg/newGroup/linkIconBig.svg'}
                  width={50}
                  height={50}
                  alt="add person"
                />
                <p className="font-IranYekanDemiBold text-center text-[1.5dvh] leading-6 text-MainTextTwo md:text-[1.7dvh] md:leading-6">
                  {t('invitation_desc')}
                </p>
              </div>
              <div
                className={`mt-6 flex w-full flex-col items-center justify-center gap-y-3 rounded-3xl border-2 border-gray-200 p-[7px] shadow-[0_15px_35px_-5px_rgba(0,0,0,0.1)]  ${t('system_lang') === 'fa' ? 'rtl-custome' : 'ltr-custome'}`}
              >
                <div className="flex w-full flex-col items-center justify-center gap-y-5 rounded-3xl bg-MainBgOne px-6 py-6">
                  <div onClick={handleCopyUrl} className="flex w-full cursor-pointer items-center justify-start gap-x-4">
                    <Image className="h-[23px] w-[23px] object-contain" src={'/svg/newGroup/sendIcon.svg'} width={23} height={23} alt="add person" />
                    <p className="font-IranYekanBold text-[1.5dvh] leading-4 text-MainTextOne md:text-[1.7dvh]">
                      {t('send_link_with_this_application')}
                    </p>
                  </div>
                  <span className="h-[1px] w-full bg-[#C5E0D3]"></span>
                  <div
                    onClick={() => {
                      toast.success(t('link_copied_clipboard'));
                    }}
                    className="flex w-full cursor-pointer items-center justify-start gap-x-4"
                  >
                    <Image className="h-[23px] w-[23px] object-contain" src={'/svg/newGroup/copyIcon.svg'} width={23} height={23} alt="add person" />
                    <p className="font-IranYekanBold text-[1.5dvh] leading-4 text-MainTextOne md:text-[1.7dvh]">{t('copy_link')}</p>
                  </div>
                  <span className="h-[1px] w-full bg-[#C5E0D3]"></span>
                  <div onClick={ShareLink} className="flex w-full cursor-pointer items-center justify-start gap-x-4">
                    <Image className="h-[23px] w-[23px] object-contain" src={'/svg/newGroup/shareIcon.svg'} width={23} height={23} alt="add person" />
                    <p className="font-IranYekanBold text-[1.5dvh] leading-4 text-MainTextOne md:text-[1.7dvh]">{t('share_link')}</p>
                  </div>
                  <span className="h-[1px] w-full bg-[#C5E0D3]"></span>
                  <div onClick={() => dispatch(addSlide('qrCodePage'))} className="flex w-full cursor-pointer items-center justify-start gap-x-4">
                    <Image
                      className="h-[23px] w-[23px] object-contain"
                      src={'/svg/newGroup/barcodeIcon.svg'}
                      width={23}
                      height={23}
                      alt="add person"
                    />
                    <p className="font-IranYekanBold text-[1.5dvh] leading-4 text-MainTextOne md:text-[2dvh]">{t('barcode')}</p>
                  </div>
                  <span className="h-[1px] w-full bg-[#C5E0D3]"></span>
                  <div onClick={() => setIsOpen(true)} className="flex w-full cursor-pointer items-center justify-start gap-x-4">
                    <Image
                      className="h-[23px] w-[23px] object-contain"
                      src={'/svg/newGroup/recoveryIcon.svg'}
                      width={23}
                      height={23}
                      alt="add person"
                    />
                    <p className="font-IranYekanBold text-[1.5dvh] leading-4 text-MainTextOne md:text-[1.7dvh]">{t('reset_link')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ResetLinkDialog open={isOpen} setOpen={setIsOpen} />
    </main>
  );
};

export default Index;
