'use client';

import Image from 'next/image';
import DeleteDialog from '../../../Dialogs/DeleteItemDialog/Index';
import { useState } from 'react';
import BackButton from '@/components/BackButton/BackButton';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t } = useTranslation();
  const [blockOrganizationDialog, setBlockOrganizationDialog] = useState(false);
  return (
    <main className="flex h-full min-h-[100dvh] w-full items-start justify-center bg-[#929292]">
      <div className="flex h-full min-h-[100dvh] w-full items-start justify-center bg-MainBgThree">
        <div className="flex h-full w-full flex-col items-start justify-center">
          {/* header */}
          <header className="flex h-[8dvh] w-full items-center justify-end">
            <nav className={`flex w-full items-center justify-between px-5 ${localStorage.getItem('lang') === 'fa' ? 'ltr-custome' : 'rtl-custome'}`}>
              <BackButton />
              <p className="font-IranYekanBold text-center text-[1.2dvh] text-white md:text-[16px]">{t('group or organization setting')}</p>
              <div className="flex w-[5rem] items-center justify-end gap-x-2"></div>
            </nav>
          </header>
          {/* page content */}
          <div className="box-shadow relative flex h-full w-full flex-col items-center justify-start overflow-hidden rounded-t-[30px] bg-MainBgTwo pt-3">
            <div className="your-component-scrollbar ltr-custome flex h-[calc(100dvh-8dvh)] w-[92%] flex-col items-center justify-start pb-28">
              <div className="rtl-custome mt-6 flex w-[95%] flex-col items-center justify-center gap-y-7 rounded-3xl bg-MainBgOne p-5">
                {/* title with image */}
                <div className="relative flex h-[132px] w-[132px] items-center justify-center rounded-full bg-MainBgTwo">
                  <Image className="h-[62px] w-[62px] object-contain" src={'/svg/newGroup/groupBig.svg'} width={62} height={62} alt="add person" />
                  <div className="absolute bottom-0 right-0 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-MainBgOne">
                    <Image className="h-[30px] w-[30px] object-contain" src={'/svg/userInfo/block.svg'} width={30} height={30} alt="add person" />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-y-2">
                  <p className="font-IranYekanDemiBold text-center text-[18px] leading-6 text-MainTextOne">{t('Disable')}</p>
                  <p className="font-IranYekanMedium text-center text-[15px] leading-6 text-MainTextTwo">{t('This operation is irreversible')}.</p>
                </div>
                {/* detail and warning about disable group */}
                <div className="rtl-custome mt-6 flex w-[95%] flex-col items-center justify-center gap-y-3">
                  <div className="flex w-full flex-col items-center justify-center gap-y-5 rounded-3xl bg-MainBgOne px-6 py-6">
                    <div className="flex w-full cursor-pointer items-start justify-start gap-x-4">
                      <Image
                        className="h-[12px] w-[23px] object-contain"
                        src={'/svg/newGroup/connectionIcon.svg'}
                        width={23}
                        height={23}
                        alt="add person"
                      />
                      <div className="flex flex-col items-start justify-center gap-y-2">
                        <p className="font-IranYekanBold text-MainTextOne">{t('disconnectedGroups')}</p>
                        <p className="font-IranYekanDemiBold text-[14px] leading-6 text-[#707070]">{t('disableGroupsTheory')}</p>
                      </div>
                    </div>
                    <span className="h-[1px] w-full bg-[#C5E0D3]"></span>
                    <div className="flex w-full cursor-pointer items-start justify-start gap-x-4">
                      <Image
                        className="h-[16px] w-[23px] object-contain"
                        src={'/svg/newGroup/muteIcon.svg'}
                        width={23}
                        height={16}
                        alt="add person"
                      />
                      <div className="flex flex-col items-start justify-center gap-y-2">
                        <p className="font-IranYekanBold text-MainTextOne">{t('This organizations group is being close')}</p>
                        <p className="font-IranYekanDemiBold text-[14px] leading-6 text-[#707070]">
                          {t('Previous admins cannot message this organization')}
                        </p>
                      </div>
                    </div>
                    <span className="h-[1px] w-full bg-[#C5E0D3]"></span>
                    <div className="flex w-full cursor-pointer items-start justify-start gap-x-4">
                      <Image
                        className="h-[16px] w-[23px] object-contain"
                        src={'/svg/newGroup/garbageIcon.svg'}
                        width={23}
                        height={16}
                        alt="add person"
                      />
                      <div className="flex flex-col items-start justify-center gap-y-2">
                        <p className="font-IranYekanBold text-MainTextOne">{t('Organization information will be deleted')}</p>
                        <p className="font-IranYekanDemiBold text-[14px] leading-6 text-[#707070]">{t('deleteGroupTheory')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* fixed button */}
            <div
              onClick={() => setBlockOrganizationDialog(true)}
              className="shadoow-3D absolute bottom-8 right-3 flex h-[60px] cursor-pointer items-center justify-start gap-x-2 rounded-2xl bg-[#D92626] px-4 pr-3 transition-all duration-200 hover:bg-[#c12d2d]"
            >
              <p className="font-IranYekanDemiBold text-white">{t('Disable')}</p>
              <Image
                width={30}
                height={30}
                className="-mb-1 h-[30px] w-[30px] object-contain"
                src={'/svg/newGroup/nextArrow.svg'}
                alt="next arrow Icon"
              />
            </div>
          </div>
        </div>
      </div>
      <DeleteDialog setOpen={setBlockOrganizationDialog} open={blockOrganizationDialog} text={t('disableGroupQue')} />
    </main>
  );
};

export default Index;
