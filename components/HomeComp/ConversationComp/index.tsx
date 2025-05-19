'use client';

// کامپوننت‌ها و پکیج‌ها را ایمپورت می‌کنیم
import Image from 'next/image';
import { EventIDs } from '@/Services/EventIDs';
import { useTranslation } from 'react-i18next';
import useOutsideClick from '@/utils/useOutSideClick';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import UseConvertTimeStamp from '@/utils/useConvertTimeStamp';
import { ChatData, Conversation } from '../../../lib/data/Conversation';
import useUserStatus, { ChatItem } from '@/utils/useUserStatus';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { openDatabase, saveOrGetUser } from '@/utils/useCreateUuid';
import DeleteDialog from '@/components/Dialogs/DeleteItemDialog/Index';
import {
  addNewChatList,
  getUserInfoByIndexDb,
  Messages,
  Profile,
  resetAllMessages,
  setDirectIdBySocket,
  UserInfoByIndexDb,
  UserStatus,
} from '@/store/slices/AccountInformationSlice';
import Loading from './loading';
import { currentTime, getMessageTypeText, getRandomColor, isDarkColor } from '@/utils/publicFunctions';
import { setBackToChatList } from '@/store/slices/BackToChatList';
import { addSlide } from '@/store/slices/ChangeSilde';
import useSearch from '@/utils/useSearch';
// import { handleSubmitDownload } from '@/Services/grpcApi';

// تعریف انواع داده‌ها

interface namesType {
  name: string | null;
  id: number;
}

interface ChatInChatListType1 {
  direct_id?: number;
  user_id_1?: number;
  user_id_2?: number;
  secret_direct?: boolean;
}

// نوع داده برای لیست چت
interface ChatListType {
  chat: ChatInChatListType1 | null;
  id: number | null;
  message: Messages;
  stype?: string | null;
}

// نوع داده برای اطلاعات مخاطب
interface ContactValue {
  GUID: string;
  contact_id: number;
  contact_name: string;
}

// نوع داده برای اطلاعات پروفایل شخصی
interface Self_Profile {
  user_id: number;
}

// نوع داده برای وضعیت اطلاعات حساب
interface AccountInfoState {
  chatList: ChatListType[];
  self_profile: Self_Profile;
  contactInfo: ContactValue[];
  unreadMessages: Messages[];
  userReadStatus: string;
  socketDirects: number | null;
  lastMessage: Messages | null;
  UserProfileById: Profile[];
  user_messages: Messages[];
  userInfoByIndexDb: UserInfoByIndexDb;
  directDeletedId: number | null;
  socketDirectId: number | null;
  newMessage: Messages | null;
  user_status: UserStatus;
}


// کامپوننت اصلی
const Index = ({ socket , isSearchOpen,query }: { socket: WebSocket; isSearchOpen: boolean ; query: string }) => {
  // بخش اضافه کردن استیت ها و سایر tools ها
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id: userParams } = useParams();
  const [directList, setDirectList] = useState<ChatItem[]>([]);
  // const [downloadedProfile, setDownloadedProfile] = useState<string>();
  const { filteredListExist, getUserProfileById, updatedDirects } = useUserStatus(userParams?.toString());
  const [openDeleteDirectDialog, setOpenDeleteDirectDialog] = useState<boolean>(false);
  const [deleteMessageProps, setDeleteMessageProps] = useState<number>();
  const {
    contactInfo,
    unreadMessages,
    self_profile,
    chatList,
    socketDirectId,
    UserProfileById,
    user_status,
    user_messages,
    directDeletedId,
    newMessage,
  } = useSelector((state: { accountInfo: AccountInfoState }) => state.accountInfo);

  
  // پیدا کردن آخرین پیام
  const findLastMessage: Messages = useMemo(() => user_messages[user_messages?.length - 1], [user_messages]);

  useEffect(() => {
    if (!socketDirectId || !getUserProfileById?.contact_id || directDeletedId) return;
    const newDirect: ChatListType = {
      id: socketDirectId!,
      chat: {
        direct_id: socketDirectId!,
        user_id_1: self_profile?.user_id,
        user_id_2: getUserProfileById?.contact_id,
        secret_direct: false,
      },
      message: {
        message_id: null,
        message: findLastMessage?.message,
        stype: null,
        sid: null,
        sender_id: null,
        receiver_id: self_profile?.user_id || null,
        send_at: currentTime || null,
        created_at: null,
      },
    };

    const isDuplicate = chatList.some((chat) => chat.id === newDirect.id);
    if (!isDuplicate) {
      dispatch(addNewChatList(newDirect));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketDirectId, dispatch, self_profile, getUserProfileById, findLastMessage, chatList]);

  useEffect(() => {
    if (!newMessage || directDeletedId) return; // بررسی اینکه پیام جدید وجود دارد

    const existingDirect = chatList?.find((direct) => direct.id === newMessage.sid);
    if (!existingDirect) {
      const newDirect: ChatListType = {
        id: newMessage.sid,
        chat: {
          direct_id: newMessage.sid!,
          user_id_2: newMessage.sender_id!,
          user_id_1: newMessage.receiver_id!,
          secret_direct: false,
        },
        message: {
          message_id: newMessage.message_id,
          message: newMessage.message,
          stype: newMessage.stype,
          sid: newMessage.sid,
          sender_id: newMessage.sender_id,
          receiver_id: newMessage.receiver_id,
          send_at: newMessage.send_at,
          created_at: Number(new Date(newMessage.send_at! * 1000).toISOString()),
        },
        stype: newMessage.stype!,
      };
      dispatch(addNewChatList(newDirect));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage, chatList, dispatch]);

  // مدیریت کلیک خارج از کامپوننت
  const { visibleIndex, refs, showComponent } = useOutsideClick(filteredListExist?.length);

  useEffect(() => {
    setDirectList(updatedDirects);
  }, [updatedDirects]);

  // تابع گرفتن لیست دایرکت ها
  useEffect(() => {
    if (socket) socket.send(JSON.stringify({ event: EventIDs.GET_DIRECTS }));
  }, [socket]);

  const getUrl = async (id?: number) => {
    const db = await openDatabase();
    const transaction = db.transaction('users', 'readonly');
    const store = transaction.objectStore('users');
    const res = store?.getAll();
    res.onsuccess = () => {
      const indexDbArr = res.result;
      const resGUID = indexDbArr.find((item) => Number(item?.id) === id);
      dispatch(getUserInfoByIndexDb(resGUID));
      router.push(`/home/${resGUID?.user_hash}`);
    };
  };

  // ارسال داده به سرور از طریق سوکت
  const [names, setNames] = useState<namesType[]>([]);
  useEffect(() => {
    const allUserIds = updatedDirects?.map((item) => item.chat.user_id_1 || item.chat.user_id_2);
    if (allUserIds.length > 0) {
      if (socket) {
        socket.send(JSON.stringify({ event: EventIDs.USER_PROFILE_IDS, data: { user_ids: allUserIds } }));
      }
    }
  }, [updatedDirects, socket]);

  const findTheContactNames = useCallback(() => {
    const info = updatedDirects?.map((item) => item.chat.user_id_2 || item.chat.user_id_1);
    const res = UserProfileById.length > 0 ? UserProfileById?.filter((item) => info.includes(item.user_id!)) : [];
    setNames([...res?.map((item) => ({ name: item.first_name!, id: item.user_id! }))]);
  }, [updatedDirects, UserProfileById]);

  useEffect(() => {
    findTheContactNames();
  }, [findTheContactNames]);

  const updateList = useMemo(() => {
    return names.map((name) => {
      const matchingContact = contactInfo.find((item) => item.contact_id === name.id);
      if (matchingContact) {
        return {
          ...name,
          name: matchingContact?.contact_name,
        };
      }
      return name;
    });
  }, [names, contactInfo]);

  // تابع حذف دایرکت ایجاد شده
  const handleDeleteDirect = useCallback(
    (id?: number) => {
      if (socket) {
        socket.send(JSON.stringify({ event: EventIDs.DELETE_DIRECT, data: { direct_id: id } }));
      }
    },
    [socket]
  );

  useEffect(() => {
    if (directDeletedId) {
      router.replace('/home');
    }
  }, [directDeletedId, router]);

  useEffect(() => {
    const findUserIds = directList?.map((item) => item.chat.user_id_1 || item.chat.user_id_2);
    findUserIds.map((item) => saveOrGetUser(item));
  }, [directList]);

  const unreadMessagesLength = unreadMessages?.filter((item) => !item!.read_at).filter((item) => item.sender_id !== self_profile?.user_id);
  const unreadUserMessagesLength = user_messages?.filter((item) => !item!.read_at).filter((item) => item.sender_id !== self_profile?.user_id);

  // تابع کرفتن لیست تمام پیام‌ها با هربار تغییر direct_id
  useEffect(() => {
    (async () => {
      const db = await openDatabase();
      const transaction = db.transaction('users', 'readonly');
      const store = transaction.objectStore('users');
      const res = store?.getAll();
      res.onsuccess = () => {
        const indexDbArr = res.result;
        const resGUID = indexDbArr.find((item) => item?.user_hash === userParams);
        const findChatList = chatList.find((item) => item.chat?.user_id_1 === resGUID?.id || item.chat?.user_id_2 === resGUID?.id);
        if (!findChatList) {
          dispatch(resetAllMessages());
          return;
        }
        setTimeout(() => {
          if (socket)
            socket.send(
              JSON.stringify({
                event: EventIDs.GET_DIRECT_MESSAGES_TIMES,
                data: {
                  sid: findChatList.id,
                  start_time: '2006-01-02 15:04:05',
                  end_time: '2026-01-02 15:04:05',
                },
              })
            );
        }, 500);
      };
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userParams, chatList, socket]);

  // useEffect(() => {
  //   (async () => {
  //     if (!UserProfileById) return;
  //     const findUserImageProfile = Array.isArray(UserProfileById) ? UserProfileById?.find((item) => item?.avatar) : ({} as Profile);
  //     if (!findUserImageProfile) return;
  //     const dlRes = await handleSubmitDownload(findUserImageProfile!.avatar!);
  //     const mainUrl = URL.createObjectURL(dlRes.data);
  //     setDownloadedProfile(mainUrl);
  //   })();
  // }, [UserProfileById]);

  const [randomBg, setRandomBg] = useState<{ color: string; bg: string }>();
  useEffect(() => {
    const randColor = getRandomColor();
    const textColor = isDarkColor(randColor) ? 'text-white' : 'text-black';
    setRandomBg({ bg: randColor, color: textColor });
  }, []);





  return (
    <>
      {socket ? (
        <div className="md:item-start your-component-scrollbar mb-5 flex h-[100dvh] w-full flex-col items-center justify-start pb-[30dvh]">

          {/* when user is searching and found a direct */}
        {isSearchOpen && query.length > 0 ? (() => {
          const filteredList = directList.filter((item) => {
            const userId = item.chat?.user_id_1 || item.chat?.user_id_2;
            const user = updateList.find((u) => u.id === userId);
            return user?.name?.toLowerCase().includes(query.toLowerCase().trim());
          });

          return filteredList.length > 0 ? (
            filteredList.map((item, index) => {
              const userId = item.chat?.user_id_1 || item.chat?.user_id_2;
              const user = updateList.find((u) => u.id === userId);
              const isOnline = user_status.user_id === item.chat?.user_id_1 || user_status.user_id === item.chat?.user_id_2 ? user_status : false;

              if (!user) return null;

              return (
                <div
                  onContextMenu={(event) => showComponent(event, index)}
                  onClick={() => {
                    getUrl(userId);
                    dispatch(setDirectIdBySocket(item.id));
                  }}
                  key={index}
                  className="relative flex min-h-[10dvh] w-full cursor-pointer items-center justify-center rounded-2xl px-2 transition-all duration-200 hover:bg-MainBgTwo sm:px-3"
                >
                  <div
                    dir={`${t('system_lang') === 'en' ? 'rtl' : 'ltr'}`}
                    className={`z-10 flex min-h-[10dvh] w-full items-center justify-between ${index + 1 !== directList.length && 'border-b border-[#C5E0D3]'}`}
                  >
                    <div className="flex items-center justify-center gap-x-3">
                      <div
                        style={{ backgroundColor: `${randomBg?.bg}` }}
                        className="relative flex h-[6dvh] w-[6dvh] items-center justify-center rounded-full"
                        onClick={() => dispatch(addSlide('userDetail'))}
                      >
                        <span
                          className={`${
                            true ? 'hidden' : isOnline?.status === 'online' ? '' : ''
                          } absolute right-[3px] top-[3px] h-[10px] w-[10px] rounded-full border border-[#F6F6F6] bg-MainBgThree`}
                        ></span>
                        <p className={` ${randomBg?.color} font-IranYekanBold text-[1.6dvh] text-MainTextOne`}>{user?.name?.charAt(0)}</p>
                      </div>
                      <div className="flex flex-col items-start justify-center gap-y-2" onClick={() => dispatch(setBackToChatList(false))}>
                        <p className="font-IranYekanBold text-[1.7dvh] text-MainTextOne">{user?.name}</p>
                        <p
                          className={`w-[280px] overflow-hidden text-ellipsis text-nowrap text-end text-[1.3dvh] text-MainTextTwo ${t('system_lang') === 'fa' ? 'rtl-custome' : 'ltr-custome'}`}
                        >
                          {getMessageTypeText(item.message?.message) || getMessageTypeText(findLastMessage.message)}
                        </p>
                      </div>
                    </div>

                    {/* notif badge */}
                    <div className="flex flex-col items-center justify-center gap-y-2">
                      <UseConvertTimeStamp timestamp={item.message?.send_at!} />
                      {unreadMessagesLength[index]?.sid === item?.id && unreadMessagesLength.length > 0 ? (
                        <span className="flex h-[3.1dvh] w-[3.1dvh] items-center justify-center rounded-full bg-MainBgThree text-[1.5dvh] text-white">
                          {unreadMessagesLength.length}
                        </span>
                      ) : unreadUserMessagesLength.length > 0 && unreadUserMessagesLength[index]?.sid === item?.id ? (
                        <span className="flex h-[3.1dvh] w-[3.1dvh] items-center justify-center rounded-full bg-MainBgThree text-[1.5dvh] text-white">
                          {unreadUserMessagesLength.length}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            // when user is searching and didn't found any direct
            <p className="absolute top-1/2 text-[1.7dvh] text-gray-700">{t('NoUserFound')}</p>
          );
        })() 
        : // when user is not searching & there is direct
          directList.length > 0 ? (
            directList?.map((item, index) => {
              const filterName = updateList?.find((i) => i.id === item?.chat!.user_id_1 || i.id === item?.chat!.user_id_2);
              const isOnline = user_status.user_id === item.chat?.user_id_1 || user_status.user_id === item.chat?.user_id_2 ? user_status : false;
              return (
                <div
                  onContextMenu={(event) => showComponent(event, index)}
                  rel="preload"
                  onClick={() => {
                    getUrl(item.chat?.user_id_1 || item.chat?.user_id_2);
                    dispatch(setDirectIdBySocket(item.id));
                  }}
                  key={index}
                  className="relative flex min-h-[10dvh] w-full cursor-pointer items-center justify-center rounded-2xl px-2 transition-all duration-200 hover:bg-MainBgTwo sm:px-3"
                >
                  <div
                    dir={`${t('system_lang') === 'en' ? 'rtl' : 'ltr'}`}
                    className={`z-10 flex min-h-[10dvh] w-full items-center justify-between ${
                      index + 1 !== Conversation.length && 'border-b border-[#C5E0D3]'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-x-3">
                      <div
                        style={{ backgroundColor: `${randomBg?.bg}` }}
                        className={`relative flex h-[6dvh] w-[6dvh] items-center justify-center rounded-full`}
                        onClick={() => dispatch(addSlide('userDetail'))}
                      >
                        <span
                          className={`${
                            true ? 'hidden' : isOnline?.status === 'online' ? '' : ''
                          } absolute right-[3px] top-[3px] h-[10px] w-[10px] rounded-full border border-[#F6F6F6] bg-MainBgThree`}
                        ></span>
                        {false ? (
                          <Image
                            width={65}
                            height={65}
                            className="h-full w-full rounded-full border border-[#F6F6F6] object-cover object-top"
                            src=""
                            alt="icon image"
                          />
                        ) : (
                          <p className={` ${randomBg?.color} font-IranYekanBold text-[1.6dvh] text-MainTextOne`}>{filterName?.name?.charAt(0)}</p>
                        )}
                      </div>
                      <div className="flex flex-col items-start justify-center gap-y-2" onClick={() => dispatch(setBackToChatList(false))}>
                        <p className="font-IranYekanBold text-[1.7dvh] text-MainTextOne">{filterName?.name}</p>
                        <p
                          className={`w-[280px] overflow-hidden text-ellipsis text-nowrap text-end text-[1.3dvh] text-MainTextTwo ${t('system_lang') === 'fa' ? 'rtl-custome' : 'ltr-custome'}`}
                        >
                          {getMessageTypeText(item.message?.message) || getMessageTypeText(findLastMessage.message)}
                        </p>
                      </div>
                    </div>
                    {/* notif badge */}
                    <div className="flex flex-col items-center justify-center gap-y-2">
                      <UseConvertTimeStamp timestamp={item.message!.send_at!} />
                      {unreadMessagesLength[index]?.sid === item?.id && unreadMessagesLength.length > 0 ? (
                        <span className="flex h-[3.1dvh] w-[3.1dvh] items-center justify-center rounded-full bg-MainBgThree text-[1.5dvh] text-white">
                          {unreadMessagesLength.length}
                        </span>
                      ) : unreadUserMessagesLength.length > 0 && unreadUserMessagesLength[index]?.sid === item?.id ? (
                        <span className="flex h-[3.1dvh] w-[3.1dvh] items-center justify-center rounded-full bg-MainBgThree text-[1.5dvh] text-white">
                          {unreadUserMessagesLength.length}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <span
                    ref={(el) => {
                      if (refs[index]) refs[index].current = el;
                    }}
                    className={`absolute right-0 top-2 z-[999999999] h-fit divide-y rounded-[10px] border border-[#d1d1d1] bg-[#fafafa] p-[.2rem] opacity-0 shadow-sm transition-all duration-200 ${visibleIndex === index ? 'visible scale-100 opacity-100' : 'invisible scale-90 opacity-0'}`}
                  >
                    <div className="rtl-custome flex w-full cursor-pointer items-center justify-between gap-2 p-2 text-gray-800 transition-all duration-200 hover:rounded hover:bg-[#70757914]">
                      <p className="text-[1.9dvh]">{t('markAsRead')}</p>
                      <Image src="/images/homePage/edit-icon.svg" alt="" width={20} height={20} />
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteMessageProps(item.id as number);
                        setOpenDeleteDirectDialog(true);
                      }}
                      className="rtl-custome flex w-full cursor-pointer items-center justify-between p-2 text-red-600 transition-all duration-200 hover:rounded hover:bg-[#ff1b1b28]"
                    >
                      <p className="text-[1.9dvh]">{t('delete')}</p>
                      <Image src="/images/homePage/delete-icon.svg" alt="" width={20} height={20} />
                    </div>
                  </span>
                </div>
              );
            })
          ) : (
            // when there is no direct and user is not searching
            <p className="absolute top-1/2 text-[1.7dvh] text-gray-700">{t('directsEmptyText')}</p>
        )}

          <DeleteDialog
            open={openDeleteDirectDialog}
            setOpen={setOpenDeleteDirectDialog}
            text={t('delete_direct_text')}
            btnText={t('delete')}
            btnStyle={'bg-red-500 hover:bg-red-700 focus:bg-red-700 active:bg-red-700'}
            handleFunc={handleDeleteDirect}
            id={deleteMessageProps}
            titleText={t('deleteConversation')}
            hasTitle={true}
          />
        </div>
      ) : (
        <Loading dir="en" />
      )}
    </>
  );
};

export default Index;
