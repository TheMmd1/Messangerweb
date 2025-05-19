import { useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Messages, Profile, SocketDirectsType, UserInfoByIndexDb } from '@/store/slices/AccountInformationSlice';
import { openDatabase } from './useCreateUuid';
import { currentTime } from './publicFunctions';

// create necessary types
export interface ContactValue {
  GUID: string;
  contact_id: number;
  contact_name: string;
  contact_value: string;
}

export interface Chat {
  id: number;
  user_id_1: number;
  user_id_2: number;
  [key: string]: string | number | undefined; // Restrict to valid types
}

export interface ChatItem {
  chat: Chat;
  message: Messages;
  id?: number;
  [key: string]: string | number | Chat | Messages | undefined; // Allow additional fields with valid types
}

export interface SelfProfile {
  user_id: number;
  [key: string]: string | number | undefined; // Allow dynamic fields
}

export interface UserStatus {
  user_id: number;
  status: string; // Example: "online" or "offline"
}

export interface AccountInfoState {
  contactInfo: ContactValue[];
  chatList: ChatItem[];
  self_profile: SelfProfile;
  user_status: UserStatus;
  socketDirects: SocketDirectsType[];
  UserProfileById: Profile[];
  userInfoByIndexDb: UserInfoByIndexDb;
}

interface guidType {
  id: number;
  uuid: string;
}

interface AllIndexDbArrDataType {
  id: number;
  user_hash: string;
  first_name: string | null;
  last_name: string | null;
  direct_id: number | null;
  phone_number: number | null;
  last_message: Messages | null;
}

export default function useUserStatus(userId?: string) {
  const [directIdByIndex, setDirectIdByIndex] = useState<guidType>();
  const [allIndexDbArr, setAllIndexDbArr] = useState<AllIndexDbArrDataType[]>([]);
  // Use selector with the correct state type
  const { contactInfo, chatList, self_profile, user_status, socketDirects, UserProfileById } = useSelector(
    (state: { accountInfo: AccountInfoState }) => state.accountInfo
  );

  // Memoize updatedArray
  const updatedArray = useMemo(() => {
    return chatList?.map((item): ChatItem => {
      const updatedChat: Chat = { ...item.chat };
      Object.keys(updatedChat).forEach((key) => {
        if (updatedChat[key] === self_profile.user_id) {
          delete updatedChat[key];
        }
      });
      return {
        ...item,
        chat: updatedChat,
      };
    });
  }, [chatList, self_profile.user_id]);

  // بررسی وجود لیست فیلتر شده
  const filteredListExist = useMemo(() => {
    return updatedArray?.filter((item) => item?.message && Object.keys(item?.message).length > 0);
  }, [updatedArray]);

  // پیدا کردن نزدیک‌ترین آیتم
  const updatedDirects = filteredListExist.sort((a, b) => {
    return Math.abs(a.message.send_at! - currentTime) - Math.abs(b.message.send_at! - currentTime);
  });

  const updatedDirectArray = useMemo(() => {
    if (socketDirects[0]?.user_id_1 || socketDirects[0]?.user_id_2) {
      return socketDirects?.map((item: SocketDirectsType) => {
        const updatedChat = { ...item };
        Object?.keys(updatedChat)?.forEach((key) => {
          if (updatedChat[key as keyof SocketDirectsType] === self_profile?.user_id) {
            delete updatedChat[key as keyof SocketDirectsType];
          }
        });
        return updatedChat;
      });
    }
  }, [socketDirects, self_profile?.user_id]);

  // Memoize isUserOnlineOrOffline
  const isUserOnlineOrOffline = useMemo(() => {
    const foundChat = updatedArray?.find((item) => {
      return item.chat.user_id_1 === user_status?.user_id || item.chat.user_id_2 === user_status?.user_id;
    });
    return foundChat ? user_status?.status : undefined;
  }, [updatedArray, user_status]);

  // Memoize getUserProfileById
  const getUserProfileById = useMemo(() => {
    return contactInfo?.find((item) => item.GUID === userId);
  }, [contactInfo, userId]);

  // Memoize getUserProfileById
  const getUserProfileByIndexDb = useMemo(() => {
    return allIndexDbArr?.find((item) => item.user_hash === userId);
  }, [allIndexDbArr, userId]);

  const getUrl = useCallback(async () => {
    const db = await openDatabase();
    const transaction = db.transaction('users', 'readonly');
    const store = transaction.objectStore('users');
    const res = store?.getAll();
    res.onsuccess = () => {
      const indexDbArr = res.result;
      const resGUID = indexDbArr.find((item) => item?.user_hash === userId);
      setAllIndexDbArr(indexDbArr);
      setDirectIdByIndex(resGUID);
    };
  }, [userId]);

  useEffect(() => {
    (async () => await getUrl())();
  }, [getUrl]);

  const getDirectIdByIndexDb = useMemo(() => {
    return updatedDirectArray?.find((item) => item.user_id_1 === directIdByIndex?.id || item.user_id_2 === directIdByIndex?.id);
  }, [directIdByIndex, updatedDirectArray]);

  const getProfileInfoByIndexDbId = useMemo(() => {
    const result = Array.isArray(UserProfileById) && UserProfileById?.filter((item) => item?.user_id === getUserProfileByIndexDb?.id);
    return result;
  }, [getUserProfileByIndexDb, UserProfileById]);

  return {
    getDirectIdByIndexDb,
    isUserOnlineOrOffline,
    getUserProfileByIndexDb,
    getUserProfileById,
    allIndexDbArr,
    updatedArray,
    updatedDirectArray,
    directIdByIndex,
    getProfileInfoByIndexDbId,
    filteredListExist,
    updatedDirects,
  };
}
