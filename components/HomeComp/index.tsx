'use client';

import { useTranslation } from 'react-i18next';
import { useWebSocketContext } from '@/Services/MainWebsocket';
import Sidbar from '@/components/HomeComp/SidbarComp/Index';
import { ReactNode, useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';

// Redux imports
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { setBackToChatList } from '@/store/slices/BackToChatList';

export default function Index({ children }: { children?: ReactNode }) {
  const { t } = useTranslation();
  // const { id: userId }: { id: string } = useParams();
  const { socket } = useWebSocketContext();

  const dispatch = useDispatch<AppDispatch>();
  const backToChatList = useSelector((state: RootState) => state.backToChatList.value);

  const [isReady, setIsReady] = useState(false);
       
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        dispatch(setBackToChatList(false));
      } else {
        dispatch(setBackToChatList(true));
      }
      setIsReady(true);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  return (
    <div className={`transition-opacity duration-300 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
      <div
        className={`relative flex h-[100dvh] items-start justify-between bg-MainBgThree ${
          t('system_lang') === 'fa' ? 'flex-row' : 'flex-row-reverse'
        }`}
      >
        {isReady && (
          <div
            className={`ease-[cubic-bezier(0.25, 0.8, 0.25, 1)] absolute z-20 h-[100dvh] w-full transform bg-white transition-transform duration-300 ${
              backToChatList ? 'translate-x-full' : 'translate-x-0'
            } md:relative md:block md:min-w-[calc(100%-20rem)] md:translate-x-0 lg:min-w-[calc(100%-26rem)]`}
          >
            <div className="absolute left-0 top-0 h-full w-full bg-[url(/images/homePage/download.png)] opacity-[35%]" />
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-tl from-[#ffffffc0] via-[#38a27163] to-[#ffffffc0] backdrop-blur-[.5px]" />

            {children}
          </div>
        )}
        <Sidbar socket={socket!} />
      </div>
    </div>
  );
}
