'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { EventIDs } from '@/Services/EventIDs';
import { useTranslation } from 'react-i18next';
import useUserStatus from '@/utils/useUserStatus';
import { EmojiClickData } from 'emoji-picker-react';
import { saveOrGetUser } from '@/utils/useCreateUuid';
import { useDispatch, useSelector } from 'react-redux';
import LastSeen from '@/components/LastSeenCompo/Index';
import { handleSubmitUpload } from '@/Services/grpcApi';
import ChatBody from '@/components/ChatSection/ChatBody';
import { useWebSocketContext } from '@/Services/MainWebsocket';
import 'react-voicemail-player/dist/react-voicemail-player.css';
import UploadDialog from '@/components/Dialogs/UploadDialog/index';
import ProfileDialog from '@/components/Dialogs/ProfileDialog/index';
import { autoResize, currentTime, processMessageType } from '@/utils/publicFunctions';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import {
  ChatListType,
  EditMessageTextType,
  Messages,
  Profile,
  setDirectId,
  SocketDirectsType,
  UnreadMessages,
  updateUserMessage,
  UserInfoByIndexDb,
} from '@/store/slices/AccountInformationSlice';
import { useFileUpload } from '@/utils/fileUploadService';
import { trackUploadProgress } from '@/utils/uploadProgressService';
import { setBackToChatList } from '@/store/slices/BackToChatList';
import { addSlide } from '@/store/slices/ChangeSilde';
import { DISPLAY } from 'html2canvas/dist/types/css/property-descriptors/display';


const EmojiPicker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);

// بخش اضافه کردن تایپ ها
export interface conversionType {
  type: string;
  url?: string;
  fileName?: string;
  id: number;
  text?: string;
  createdAt: string;
  read: boolean;
  file?: Blob | MediaSource | undefined;
}
interface AccountInfoTypes {
  accountInfo: {
    user_messages: Messages[];
    unreadMessages: UnreadMessages[];
    socketDirectId: number | null;
    socketDirects: SocketDirectsType[];
    self_profile: Profile;
    UserProfileById: Profile;
    userInfoByIndexDb: UserInfoByIndexDb;
    editMessageText: EditMessageTextType;
    newMessage: Messages;
    chatList: ChatListType[];
  };
}
export interface DetailType {
  message: string;
  ticketId: string;
  fileId: string;
}

const ChatSection = () => {
  // اضافه کردن state ها و سایر tools ها
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { socket } = useWebSocketContext();
  const { id: userId }: { id: string } = useParams();
  const [chatText, setChatText] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>();
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [showEmojiContainer, setShowEmojiContainer] = useState(false);
  const [openTextEditSection, setOpenTextEditSection] = useState(false);
  const [uploadFileDetail, setUploadFileDetail] = useState<DetailType>();
  const { socketDirectId, editMessageText, self_profile } = useSelector((state: AccountInfoTypes) => state.accountInfo);
  const { file, fileType, fileSize, fileAsBuffer, filePreview, uploadDialogOpen, handleFileChange, setUploadDialogOpen } = useFileUpload();
  const { isUserOnlineOrOffline, getUserProfileById, getUserProfileByIndexDb, getProfileInfoByIndexDbId, updatedDirectArray, getDirectIdByIndexDb } =
    useUserStatus(userId);
  const autoResizeInput = useMemo(() => autoResize(), []);

  // تابع انجام عملیات روی فایل که دریافت میشه از کاربر سپس ارسال مبشه برای اینکه آپلود بشه
  const handleUploadFunc = async () => {
    if (!file) return;
    const res = await handleSubmitUpload(file!);
    setUploadFileDetail(res);
    const hasFileType = file?.type ? file?.type.split('/')[1].toLowerCase() : '';
    const obj = {
      message_id: Math.random(),
      message: processMessageType(hasFileType, res?.fileId, file?.name),
      stype: 'direct',
      fileUrl: URL.createObjectURL(file!),
      sid: socketDirectId,
      sender_id: self_profile?.user_id,
      receiver_id: getUserProfileById?.contact_id,
      send_at: currentTime,
      read_at: null,
    };
    if (res?.fileId) {
      setUploadDialogOpen(false);
      dispatch(updateUserMessage(obj));
    }
  };

  useEffect(() => {
    return trackUploadProgress({ uploadFileDetail, fileAsBuffer, fileType, file, getDirectIdByIndexDb, socketDirectId, socket, setUploadProgress });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadFileDetail, getDirectIdByIndexDb, socketDirectId, socket]);

  // تابع هندل کردن کلیک روی ایموجی ها
  const handleEmojiClick = useMemo(
    () => (emojiData: EmojiClickData) => {
      const emoji = emojiData.emoji;
      const start = chatText.slice(0, cursorPosition);
      const end = chatText.slice(cursorPosition);
      const updatedText = start + emoji + end;
      setChatText(updatedText);
      setCursorPosition(cursorPosition + emoji.length);
      if (textAreaRef.current) {
        textAreaRef.current.focus();
        textAreaRef.current.setSelectionRange(cursorPosition + emoji.length, cursorPosition + emoji.length);
      }
    },
    [chatText, cursorPosition]
  );

  useEffect(() => {
    dispatch(setDirectId(getDirectIdByIndexDb?.direct_id));
  }, [getDirectIdByIndexDb, dispatch]);

  // تابع بررسی و ارسال پیام
  const sendMessageSocket = useMemo(
    () => () => {
      const data = {
        direct_id: getDirectIdByIndexDb?.direct_id || socketDirectId,
        message: JSON.stringify({
          message: chatText,
          files: { format: '', file_id: '', file_name: '' },
          medias: { format: '', file_id: '', file_name: '' },
          audios: { format: '', file_id: '', file_name: '' },
        }),
        receiver_id: getDirectIdByIndexDb?.user_id_1 || getDirectIdByIndexDb?.user_id_2,
      };
      if (socket) socket.send(JSON.stringify({ event: EventIDs.SEND_MESSAGE, data }));
    },
    [chatText, getDirectIdByIndexDb, socket, socketDirectId]
  );

  // تابع بررسی و ارسال پیام
// updated
  const sendTextHandler = useMemo(
  () => () => {
    if (!chatText) {
      return;
    }
    setChatText('');
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
    }
    if (getDirectIdByIndexDb?.direct_id || socketDirectId) {
      sendMessageSocket();
    }
  },
  [chatText, getDirectIdByIndexDb, sendMessageSocket, socketDirectId]
);


  const handleCreateDirect = useCallback(() => {
    const isDirectExist = getDirectIdByIndexDb?.direct_id || socketDirectId;
    if (isDirectExist) sendTextHandler();
    else
      socket &&
        socket.send(
          JSON.stringify({
            event: EventIDs.NEW_DIRECT,
            data: { user_id: getUserProfileById?.contact_id },
          })
        );
    // if (socket) socket.send(JSON.stringify({ event: EventIDs.DELETE_DIRECT, data: { direct_id: 110 } }));
  }, [getUserProfileById?.contact_id, sendTextHandler, socket, getDirectIdByIndexDb?.direct_id, socketDirectId]);

  useEffect(() => {
    sendTextHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketDirectId]);

  // تابع ارسال پیام با کلیک enter و رفتن به خط بعد با shift + enter
  const handleKeyPressToSendMessage = useMemo(
    () => (e: React.KeyboardEvent<HTMLTextAreaElement>, chatText: string, setChatText: React.Dispatch<React.SetStateAction<string>>) => {
      if (e.key === 'Enter') {
        if (e.shiftKey) {
          e.preventDefault();
          setChatText(chatText + '\n');
        } else {
          e.preventDefault();
          handleCreateDirect();
        }
      }
    },
    [handleCreateDirect]
  );

  useEffect(() => {
    updatedDirectArray?.forEach((item) => saveOrGetUser(item.user_id_1! || item.user_id_2!));
  }, [updatedDirectArray]);

  useEffect(() => {
    openTextEditSection && setChatText(editMessageText?.message.message as string);
  }, [openTextEditSection, editMessageText]);

  // updated
const handleEditMessage = () => {
  const updateEditTextMessage = { ...editMessageText, message: chatText };
  if (socket) socket.send(JSON.stringify({ event: EventIDs.EDIT_MESSAGE, data: updateEditTextMessage }));
  setChatText('');
  if (textAreaRef.current) {
    textAreaRef.current.style.height = 'auto';
  }
  setOpenTextEditSection(false);
};


;

  return (
    <>
      <div className={`relative flex max-h-[100dvh] min-h-[100dvh] w-full flex-col items-center justify-start bg-MainBgThree`}>
        <>
          {/* header */}
          <div className={`flex min-h-[6dvh] w-full items-center justify-end bg-MainBgThree md:min-h-[8dvh]`}>
            <div className="flex w-full items-center justify-between px-3 md:px-5">
              <div className="flex items-center justify-center gap-x-5 md:mr-4 md:gap-x-7">
                <Image
                  // onClick={() => dispatch(setCallDialog(true))}
                  width={35}
                  height={35}
                  className="h-[20px] w-[20px] cursor-pointer object-contain md:h-[4dvh] md:w-[4dvh]"
                  src={'/svg/homePage/SingleConversation/videoIcon.svg'}
                  alt="icon image"
                />
                <Image
                  // onClick={() => dispatch(setCallDialog(true))}
                  width={35}
                  height={35}
                  className="h-[20px] w-[20px] cursor-pointer object-contain md:h-[4dvh] md:w-[4dvh]"
                  src={'/svg/homePage/SingleConversation/callIcon.svg'}
                  alt="icon image"
                />
              </div>
              <div
                onClick={() => {
                  // dispatch(addSlide('chatPage'));
                }}
                // onClick={setReadMessages}
                className="flex items-center justify-center md:gap-x-3"
              >
                <div className="flex items-center justify-center gap-x-3">
                  <div className="flex flex-col items-end justify-center gap-y-2">
                    <p className="font-IranYekanDemiBold flex cursor-pointer items-center justify-center text-[2dvh] text-white">
                      {getUserProfileById?.contact_name ||
                        (getProfileInfoByIndexDbId && getProfileInfoByIndexDbId[0]?.first_name) ||
                        `${t('loadingText')}...`}
                    </p>
                    <p className="text-[10px] text-white md:text-[1.5dvh]">
                      {isUserOnlineOrOffline === 'online' ? (
                        t('online')
                      ) : (
                        <LastSeen socket={socket!} userId={getUserProfileByIndexDb?.id || getUserProfileById?.contact_id} />
                      )}
                    </p>
                  </div>
                  <Image
                    // onClick={() => dispatch(setNewProfile(true))}
                    onClick={() => {
                      dispatch(addSlide('userDetail')), dispatch(setBackToChatList(true));
                    }}
                    width={55}
                    height={55}
                    className="ml-3 h-[4.5dvh] w-[4.5dvh] cursor-pointer rounded-full border border-[#F6F6F6] object-cover object-top md:h-[6.5dvh] md:w-[6.5dvh]"
                    src={'/svg/default_profile/user-profile.svg'}
                    alt="icon image"
                  />
                </div>
                <Image
                  // onClick={handleUserClick}
                  onClick={() => {
                    dispatch(setBackToChatList(true));
                  }}
                  width={30}
                  height={30}
                  className="h-[16px] w-[16px] cursor-pointer object-contain md:hidden md:h-[30px] md:w-[30px]"
                  src={'/svg/Setting/arrowLeft.svg'}
                  alt="icon image"
                />
              </div>
            </div>
          </div>
          {/* chat section */}

          <div className="relative flex h-[100dvh] w-full flex-col items-center overflow-hidden rounded-t-[17px] bg-[#ffffffc9] md:h-[calc(100dvh-8dvh)]">
            <div className="absolute left-0 top-0 h-full w-full bg-[url(/images/homePage/download.png)] opacity-[35%]"></div>
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-tl from-[#ffffffc0] via-[#38a27163] to-[#ffffffc0] backdrop-blur-[.5px]"></div>
            {
              <ChatBody
                setOpenEditSec={setOpenTextEditSection}
                socket={socket!}
                uploadProgress={uploadProgress!}
                fileId={uploadFileDetail?.fileId}
                fileSize={fileSize!}
              />
            }
            {/* chat input */}
            <div className="px-[2px ] flex w-full max-w-[95dvw] justify-center pb-[1rem] pt-2 md:px-[10px] lg:max-w-[50dvw] lg:px-[45px] xl:px-[50px]">
              <div
                className={`input-shadow relative flex h-auto w-full flex-col items-center justify-center bg-MainBgOne md:h-auto ${openTextEditSection ? 'rounded-[20px]' : 'rounded-[40px]'}`}
              >
                {/* text area */}
                <div
                  className={`flex w-full items-center gap-2 rounded-t-[20px] bg-MainBgOne px-[20px] py-2 ${openTextEditSection ? 'flex' : 'hidden'}`}
                >
                  <div className="">
                    <Image src="/images/homePage/edit-icon.svg" alt="" width={20} height={20} />
                  </div>
                  <div className="min-w-0 flex-1 overflow-hidden rounded-[7px] border-r-[3px] border-r-[#38a271] bg-[#38a27129] p-[10px]">
                    <p className="mb-2 text-[2dvh] text-[#278358]">{t('editingText')}</p>
                    <p className="w-full overflow-hidden truncate text-ellipsis whitespace-nowrap text-[2dvh]">{editMessageText?.message?.message}</p>
                  </div>
                  <div
                    onClick={() => {
                      setOpenTextEditSection(false);
                      setChatText('');
                    }}
                  >
                    <Image width={25} height={25} className="cursor-pointer" src="/svg/homePage/Conversation/close-icon.svg" alt="close icon" />
                  </div>
                </div>
                <label className={`relative flex h-auto w-full items-end justify-end ${t('system_lang') === 'fa' ? 'flex-row' : 'flex-row-reverse'}`}>
                  {!openTextEditSection ? (
                    <div
                      id="sendMessageButton"
                      // onClick={handleSendMessage}
                      onClick={handleCreateDirect}
                      className={`mx-3 mb-[10px] flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-MainBgThree transition-all duration-300 hover:bg-[#318b61] md:mb-[7px] lg:h-[46px] lg:w-[46px]`}
                    >
                      <Image
                        width={25}
                        height={25}
                        className={`-ml-[3px] h-[18px] w-[18px] lg:-ml-[6px] lg:h-[25px] lg:w-[25px]`}
                        src="/svg/homePage/SingleConversation/SendMessage.svg"
                        alt="icon image"
                      />
                    </div>
                  ) : (
                    <div
                      id="sendMessageButton"
                      // onClick={handleSendMessage}
                      onClick={handleEditMessage}
                      className={`mx-3 mb-[10px] flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-MainBgThree transition-all duration-300 hover:bg-[#318b61] md:mb-[7px] lg:h-[46px] lg:w-[46px]`}
                    >
                      <Image
                        width={25}
                        height={25}
                        className={`ml-[0] h-[18px] w-[18px] lg:h-[25px] lg:w-[25px]`}
                        src="/svg/homePage/Conversation/correct-signal.svg"
                        alt="icon image"
                      />
                    </div>
                  )}
                  <textarea
                    ref={textAreaRef}
                    onSelect={(e) => setCursorPosition(e.currentTarget.selectionStart)}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setChatText(newValue);
                      // به‌روزرسانی مکان کرسر پس از تغییر متن
                      // setCursorPosition(newValue.length); // یا setCursorPosition(newValue.length) برای قرار دادن کرسر در انتهای متن
                    }}
                    onKeyDown={(e) => handleKeyPressToSendMessage(e, chatText, setChatText)}
                    value={chatText}
                    rows={1}
                    dir={t('system_lang') === 'fa' ? 'rtl' : 'ltr'}
                    className={`your-component-scrollbar lg:text-md flex h-auto max-h-[200px] w-[85%] flex-1 cursor-text resize-none items-center justify-center border-0 bg-MainBgOne px-1 pb-[20px] text-start text-sm leading-[15px] md:leading-[20px] ${t('system_lang') === 'fa' ? 'pl-[.5rem]' : 'pr-[.5rem]'} font-IranYekanMedium pt-[20px] leading-5 outline-0 placeholder:text-[#A0BEB0]`}
                    placeholder={t('startToTyping')}
                    onInput={autoResizeInput}
                  ></textarea>
                  {/* file select section */}
                  <div className="relative mb-[17px] flex items-center gap-2 px-5">
                    <Menu
                      placement="top-end"
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 10 },
                      }}
                      offset={23}
                    >
                      <MenuHandler>
                        {/* @ts-ignore */}
                        <Button className="w-fit bg-inherit p-0 shadow-none hover:scale-125 hover:shadow-none focus-visible:!outline-none">
                          <Image
                            width={25}
                            height={25}
                            className={`h-[19px] w-[19px] cursor-pointer transition-all duration-200 md:h-[25px] md:w-[25px]`}
                            src={'/svg/homePage/SingleConversation/FileIcon.svg'}
                            alt="icon image"
                          />
                        </Button>
                      </MenuHandler>
                      <MenuList
                        className="flex h-[70px] w-[200px] flex-col items-start justify-center gap-0 overflow-hidden rounded-lg p-0"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {/* @ts-ignore */}
                        <MenuItem className="flex items-center gap-3 p-0">
                          <label
                            htmlFor="chooseMedia"
                            className="hover: relative flex h-[30px] w-full cursor-pointer items-center gap-1 rounded-lg pr-1 transition-colors duration-300 ease-in-out hover:bg-green-100"
                          >
                            <Image src="/svg/homePage/photo-icon.svg" alt="" width={25} height={25} className="h-[1rem] w-[1rem]" />
                            <p className="!font-YekanBakhFaNum text-[1.5dvh] text-gray-900">{t('PhotoOrVideo')}</p>
                          </label>
                        </MenuItem>
                        {/* @ts-ignore */}
                        <MenuItem className="flex items-center gap-0 p-0">
                          <label
                            htmlFor="chooseFile"
                            className="relative flex h-[30px] w-full cursor-pointer items-center gap-1 rounded-lg pr-1 transition-colors duration-300 ease-in-out hover:bg-green-100"
                          >
                            <Image src="/svg/homePage/file-icon.svg" alt="" width={25} height={25} className="h-[1rem] w-[1rem]" />
                            <p className="!font-YekanBakhFaNum text-[1.5dvh] text-gray-900">{t('file')}</p>
                          </label>
                        </MenuItem>
                      </MenuList>
                      <input
                        accept="video/*,image/*"
                        type="file"
                        id="chooseMedia"
                        hidden
                        className="absolute left-0 top-0 cursor-pointer"
                        onChange={handleFileChange}
                      />
                      <input
                        accept="*/*"
                        type="file"
                        id="chooseFile"
                        hidden
                        className="absolute left-0 top-0 cursor-pointer"
                        onChange={handleFileChange}
                      />
                    </Menu>
                    <div className="relative" onClick={() => setShowEmojiContainer(!showEmojiContainer)}>
                      <Image
                        width={25}
                        height={25}
                        className={`h-[19px] w-[19px] cursor-pointer transition-all duration-200 hover:scale-125 md:h-[25px] md:w-[25px]`}
                        src={'/svg/homePage/SingleConversation/Icon.svg'}
                        alt="icon image"
                      />
                    </div>
                    {showEmojiContainer && (
                      <div className={`absolute bottom-[48px] left-0`} dir="ltr">
                        <EmojiPicker height={350} width={300} lazyLoadEmojis onEmojiClick={handleEmojiClick} />
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>
        </>
      </div>
      {/* <ChatFileDialog
        setConversionData={setConversionData}
        frontImage={frontImage}
        ImageRemoveHandler={ImageRemoveHandler}
      /> */}
      <ProfileDialog />
      <UploadDialog
        open={uploadDialogOpen}
        fileType={fileType && fileType?.split('/')[1]!.toLowerCase()}
        func={handleUploadFunc}
        setOpen={setUploadDialogOpen as React.Dispatch<React.SetStateAction<boolean>>}
        filePreview={filePreview!}
        fileName={file?.name}
      />
    </>
  );
};
export default ChatSection;
