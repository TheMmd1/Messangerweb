'use client';

import i18n from '@/i18n';
// اضافه کردن کامپوننت ها و پکیج ها
import { EventIDs } from '@/Services/EventIDs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// بخش اضافه کردن تایپ ها
interface LastSeenProps {
  socket: WebSocket;
  userId?: number;
}

const Index: React.FC<LastSeenProps> = ({ socket, userId }) => {
  // اضافه کردن state ها و سایر tools ها
  const { t } = useTranslation();
  const [lastSeen, setLastSeen] = useState<string>(t('loading'));

  // تابع تبدیل آخرین بازدید
  useEffect(() => {
    const getLastSeenText = (timestamp: number): string => {
      const now = Date.now();
      const lastSeen = new Date(timestamp * 1000);
      const diffInSeconds = Math.floor((now - lastSeen.getTime()) / 1000);

      if (diffInSeconds < 60) return t('last_seen_moments_ago');
      if (diffInSeconds < 3600) return `${t('last_seen')} ${Math.floor(diffInSeconds / 60)} ${t('minutes_ago')}`;
      if (diffInSeconds < 86400) return `${t('last_seen')} ${Math.floor(diffInSeconds / 3600)} ${t('hours_ago')}`;
      if (diffInSeconds < 604800) return `${t('last_seen')} ${Math.floor(diffInSeconds / 86400)} ${t('day_ago')}`;
      return `${t('last_seen')} ${Math.floor(diffInSeconds / 604800)} ${t('weeks_ago')}`;
    };

    // تابع گرفتن آخرین بازید کاربر از socket
    const fetchLastSeen = () => {
      if (socket)
        socket.send(
          JSON.stringify({
            event: EventIDs.USER_LAST_SEEN,
            data: { user_id: userId },
          })
        );
    };

    const handleMessage = ({ data }: MessageEvent) => {
      const response = JSON.parse(data);
      if (response.event === 'notification' && response.state === 'lastseen') {
        const { user_id, timestamp } = response.data;
        if (user_id === userId) {
          setLastSeen(getLastSeenText(timestamp));
        }
      }
    };

    fetchLastSeen();
    if (socket) socket.addEventListener('message', handleMessage);

    // Cleanup listener
    return () => {
      if (socket) socket.removeEventListener('message', handleMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, userId, i18n.language]);

  // بخش دریافت آخرین بازدید و نمایش آن در سایر کامپوننت ها
  return <span>{lastSeen}</span>;
};

export default Index;
