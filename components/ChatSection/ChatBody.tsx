'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import axios from 'axios';
import Image from 'next/image';
import Cookies from 'js-cookie';
import moment from 'moment-jalaali';
import { EventIDs } from '@/Services/EventIDs';
import { useTranslation } from 'react-i18next';
// import VoicemailPlayer from 'react-voicemail-player';
import useOutsideClick from '@/utils/useOutSideClick';
import { useDispatch, useSelector } from 'react-redux';
import Index from '@/components/ProgressBarCompo/index';
import { handleSubmitDownload } from '@/Services/grpcApi';
import LottieAnimation from '../animations/ClockAnimation';
import UseConvertTimeStamp from '@/utils/useConvertTimeStamp';
import DeleteDialog from '@/components/Dialogs/DeleteItemDialog/Index';
import ImageDialog from '@/components/Dialogs/MessageImagesDialog/index';
import ForwadMessage from "@/components/Dialogs/ForwardMessageDialog/index"
import { getBlobSize, getMimeType, MessagesType } from '@/utils/publicFunctions';
import { getImageFromCache, removeImageFromCache, saveImageToCache } from '@/utils/useCreateCacheStorage';
import { MutableRefObject, useEffect, useMemo, useRef, useState, useCallback, Dispatch, SetStateAction } from 'react';
import {
  getEditMessage,
  Messages,
  Profile,
  resetAllUnreadMessages,
  UnreadMessages,
  updateMessageReadStatus,
} from '@/store/slices/AccountInformationSlice';
import { set } from 'react-hook-form';



// بخش اضافه کردن تایپ ها
interface ChatBodyProps {
  socket?: WebSocket;
  setOpenEditSec: Dispatch<SetStateAction<boolean>>;
  uploadProgress: number;
  fileId?: string;
  fileSize?: string;
}
interface AccountInfo {
  accountInfo: {
    self_profile: Profile;
    unreadMessages: UnreadMessages[];
    userReadStatus: string;
    receiveMessageId: string | null;
    user_messages: Messages[];
    newMessage: Messages;
  };
}
interface deleteMessagePropsType {
  sid: number;
  sender_id: number;
  message_id: string;
  file_id?: string;
}

interface FileUrls {
  url: string;
  file_id: string;
}

function ChatBody({ socket, setOpenEditSec, uploadProgress, fileId, fileSize }: ChatBodyProps) {
  // اضافه کردن state ها و سایر tools ها
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [data, setData] = useState<Messages[]>([]);
  const [imageFormat, setImageFormat] = useState<string>();
  const [mainFileUrl, setMainFileUrl] = useState<FileUrls[]>([]);
  const [messagesFileId, setMessagesFileId] = useState<string>();
  const [downloadStatus, setDownloadStatus] = useState<number>();
  const [isChangeIcon, setIsChangeIcon] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<number>();
  const [fileDownloadedSize, setFileDownloadedSize] = useState<number>();
  const bottomRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  moment.loadPersian({ usePersianDigits: true, dialect: 'persian-modern' });
  const containerRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const messageRefs: MutableRefObject<(HTMLDivElement | null)[]> = useRef([]);
  const [openDeleteMessageDialog, setOpenDeleteMessageDialog] = useState<boolean>(false);
  const [openImageMessageDialog, setOpenImageMessageDialog] = useState<boolean>(false);
  const [imageDialogUrl, setImageDialogUrl] = useState<string>();
  const [deleteMessageProps, setDeleteMessageProps] = useState<deleteMessagePropsType>();
  const { self_profile, receiveMessageId, unreadMessages, user_messages, userReadStatus } = useSelector((state: AccountInfo) => state.accountInfo);
  const { visibleIndex, refs, showComponent } = useOutsideClick(user_messages?.length);

  // تابع ذخیره کردن پیام ها برای ارسال به بخش chatBody و نمایش آن ها
  useEffect(() => {
    const unreadMessageIds = new Set(unreadMessages.map((msg) => msg.message_id));
    const processedMessages = user_messages.map((msg) => ({ ...msg, read: !unreadMessageIds.has(msg.message_id) }));
    setData(processedMessages);
  }, [user_messages, unreadMessages]);

  // اسکرول خوردن به آخرین پیام
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data]);

  // تابع read کردن پیام ها
  const handleReadMessage = useCallback(
    (message_id: string | null, sid: number | null) => {
      if (socket)
        socket.send(
          JSON.stringify({
            event: EventIDs.READ_MESSAGES,
            data: {
              message_ids: [message_id],
              sid: sid,
            },
          })
        );
    },
    [socket]
  );

  useEffect(() => {
    if (!receiveMessageId) return;

    // به‌روزرسانی پیام در Redux
    dispatch(
      updateMessageReadStatus({
        message_id: receiveMessageId,
        read_at: Date.now(),
      })
    );

    // پاک کردن پیام‌های خوانده‌نشده
    dispatch(resetAllUnreadMessages());
  }, [receiveMessageId, dispatch]);

  //  تابع بررسی ارسال پیام اسکرول خورده به socket
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const visibleMessage = data?.find((_, index) => messageRefs.current[index] === entry.target);
        if (entry.isIntersecting) {
          if (!visibleMessage?.read_at && visibleMessage?.sender_id !== self_profile.user_id && visibleMessage?.message_id) {
            handleReadMessage(visibleMessage!.message_id, visibleMessage!.sid);
          }
        }
      });
    },
    [data, self_profile.user_id, handleReadMessage]
  );

  // تابع هندل کردن پیام های اسکرول خورده
  const observer = useMemo(
    () =>
      new IntersectionObserver((entries) => handleObserver(entries), {
        root: containerRef.current,
        threshold: 0.5,
      }),
    [handleObserver]
  );

  useEffect(() => {
    const currentRefs = messageRefs.current;

    if (currentRefs) {
      currentRefs.forEach((ref) => ref && observer.observe(ref));
    }

    return () => {
      if (currentRefs) {
        currentRefs.forEach((ref) => ref && observer.unobserve(ref));
      }
    };
  }, [observer]);

  useEffect(() => {
    if (userReadStatus === 'delete_message') {
      removeImageFromCache(deleteMessageProps!.file_id!);
    }
  }, [userReadStatus, deleteMessageProps]);

  const handleDeleteMessage = useCallback(() => {
    removeImageFromCache(deleteMessageProps!.file_id!);
    if (socket) socket.send(JSON.stringify({ event: EventIDs.DELETE_MESSAGE, data: deleteMessageProps }));
  }, [socket, deleteMessageProps]);

  useEffect(() => {
    (async () => {
      const fileIds = data.flatMap((item) => {
        const { audios, medias, files } = item.message;
        return [files?.file_id, medias?.file_id, audios?.file_id].filter((id) => id);
      });
      const getFileUrls = await Promise.all(
        fileIds.map(async (fileId) => {
          const url = await getImageFromCache(fileId, 'medias');
          return url ? { file_id: fileId, url } : null;
        })
      );
      setMainFileUrl((prev) => {
        const newUrls = getFileUrls
          .filter((item): item is FileUrls => item !== null)
          .filter((item) => !prev.some((prevItem) => prevItem.file_id === item.file_id));
        return [...prev, ...newUrls];
      });
    })();
  }, [data]);

  const handleDownloadMessage = async (msg: Messages) => {
    setIsChangeIcon(true);
    const fileId = msg.message.audios?.file_id || msg.message.files?.file_id || msg.message.medias?.file_id;
    const mimeType = getMimeType(imageFormat!);
    if (!fileId) return;
    try {
      // اضافه کردن تأخیر ۱ ثانیه‌ای
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await handleSubmitDownload(fileId);
      const createUrl = URL.createObjectURL(res.data);
      setMainFileUrl((prev) => [...prev, { file_id: fileId!, url: createUrl! }]);
      if (res.status === 200) saveImageToCache(fileId, res.data, mimeType, 'medias');
      setDownloadStatus(res.status);
      setFileDownloadedSize(getBlobSize(res.data));
    } catch (error) {
      if (axios.isAxiosError(error)) setDownloadStatus(error.status);
      console.error('Error downloading file:', error);
    }
  };

  useEffect(() => {
    if (!messagesFileId) return;
    const downloadInterval = setInterval(async () => {
      try {
        const response = await axios.get(`/api/download?fileId=${messagesFileId}`);
        const { progress } = response.data;
        setDownloadProgress(progress);
        if ((progress && progress === 100) || downloadStatus === 500) {
          clearInterval(downloadInterval);
          setIsChangeIcon(false);
        }
      } catch {
        clearInterval(downloadInterval);
      }

      return () => clearInterval(downloadInterval);
    }, 1300);
  }, [messagesFileId, downloadStatus]);

  // Forwad Message

  const [openForwardMessageDialog, setOpenForwardMessageDialog] = useState<boolean>(false); 

  return (
    <section
      ref={containerRef}
      style={{ scrollbarWidth: 'none' }}
      className="your-component-scrollbar ltr-custome a relative z-0 flex h-full w-full max-w-[100dvw] flex-1 flex-col items-start justify-start overflow-x-hidden px-[15px] pt-[1rem] md:max-w-[57dvw] lg:max-w-[50dvw] lg:px-[45px] xl:px-[50px]"
    >
      <div className="w-full">
        {data?.map((item, index) => {
          const isSender = item.sender_id === self_profile.user_id;
          const itemFileIds = [item.message.medias?.file_id, item.message.files?.file_id, item.message.audios?.file_id];
          const isFileid = itemFileIds.includes(fileId);
          const matchedFile = mainFileUrl.find((file) => itemFileIds.includes(file.file_id));
          const MediasUrl = matchedFile?.file_id === item.message.medias?.file_id && matchedFile?.url;
          const filesUrl = matchedFile?.file_id === item.message.files?.file_id && matchedFile?.url;
          return (
            <div
              className={`relative flex h-fit w-full ${isSender ? 'justify-end' : 'items-start self-start'}`}
              key={index}
              ref={index === data.length - 1 ? bottomRef : null}
            >
              <div
                onContextMenu={(event) => showComponent(event, index)}
                ref={(el) => {
                  messageRefs.current[index] = el;
                }}
                className={`flex w-[90%] flex-col gap-y-1 ${isSender ? 'items-end self-end' : 'items-start self-start'} mb-[6px]`}
                style={{
                  wordWrap: 'break-word' /* This will break long words if necessary */,
                  whiteSpace: 'pre-wrap' /* Ensure new lines are respected */,
                  overflowWrap: 'break-word' /* Breaks long words that might overflow */,
                }}
              >
                {/* message type text------------------------------------------------------------------------------------------------------------------------- */}
                {MessagesType('text', item?.message) ? (
                  <div
                    style={{
                      wordWrap: 'break-word' /* This will break long words if necessary */,
                      whiteSpace: 'pre-wrap' /* Ensure new lines are respected */,
                      overflowWrap: 'break-word' /* Breaks long words that might overflow */,
                      boxSizing: 'border-box',
                    }}
                    className={`relative max-w-[100%] ${localStorage.getItem('lang') === 'fa' ? 'flex-row' : 'flex-row-reverse'} gap-[15px] text-[1rem] font-[400] leading-[1.3] transition-all duration-300 ${t('system_lang') === 'fa' ? 'rtl-custome' : 'ltr-custome'} rounded-t-[15px] px-[0.5rem] py-[8px] shadow-lg ${isSender ? (Cookies.get('theme') === 'light' ? 'rounded-bl-[15px] bg-[#d9fdd3] text-white backdrop-blur-lg' : 'bg-MainBgTwo text-textChat') : 'rounded-br-[15px] bg-MainBgOne text-textChat'}`}
                  >
                    <div
                      className={`${Cookies.get('theme') === 'light' ? 'text-[#242823]' : 'text-white'} max-w[100%] min-w-[20%] flex-1 overflow-hidden break-words`}
                    >
                      {item.message.message !== null && item?.message?.message}
                    </div>

                    {isFileid && uploadProgress < 100 ? (
                      <LottieAnimation />
                    ) : (
                      <div className="flex flex-shrink-0 items-end justify-end gap-[4px]">
                        {isSender && (
                          <Image
                            src={item?.read_at ? '/svg/homePage/SingleConversation/readIcon.svg' : '/svg/homePage/SingleConversation/unreadIcon.svg'}
                            className="mb-1"
                            width={19}
                            height={10}
                            alt="react image"
                          />
                        )}

                        <div className="font-IranYekanMedium text-[14px] text-[#6d7f69]">
                          <UseConvertTimeStamp timestamp={item.send_at!} />
                        </div>

                        {item.edit && (
                          <p className={`text-[1.25dvh] italic ${Cookies.get('theme') === 'light' ? 'text-[#6d7f69]' : 'text-gray-700'}`}>
                            ویرایش شده
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ) : // message type Image-------------------------------------------------------------------------------------------------------------------------
                MessagesType('image', item?.message) ? (
                  MediasUrl || item.fileUrl ? (
                    <div
                      onClick={() => {
                        setOpenImageMessageDialog(true);
                        setImageDialogUrl(MediasUrl || item.fileUrl);
                      }}
                      className="relative my-3 h-full w-fit max-w-[30rem] cursor-pointer"
                    >
                      <Image
                        src={`${MediasUrl || item.fileUrl}`}
                        alt="Sent Media"
                        width={23}
                        height={23}
                        className="h-[200px] w-[300px] rounded-xl border border-gray-200 object-cover shadow-md"
                      />

                      {isFileid && uploadProgress < 100 ? (
                        <LottieAnimation />
                      ) : (
                        <div className="absolute bottom-1 right-2 flex flex-shrink-0 items-center justify-center gap-[4px] rounded-full bg-black bg-opacity-30 px-1 py-[1px]">
                          {isSender && (
                            <Image
                              src={
                                item?.read_at ? '/svg/homePage/SingleConversation/readIcon.svg' : '/svg/homePage/SingleConversation/unreadIcon.svg'
                              }
                              className="mb-1"
                              width={19}
                              height={10}
                              alt="react image"
                            />
                          )}

                          <div className="font-IranYekanMedium text-[14px] text-white">
                            <UseConvertTimeStamp timestamp={item.send_at!} />
                          </div>

                          {item.edit && (
                            <p className={`text-[1.25dvh] italic ${Cookies.get('theme') === 'light' ? 'text-[#6d7f69]' : 'text-gray-700'}`}>
                              ویرایش شده
                            </p>
                          )}
                        </div>
                      )}

                      {item.message.medias?.file_id === fileId && <Index progress={uploadProgress!} />}
                    </div>
                  ) : (
                    <div
                      className={`flex h-60 w-[30rem] cursor-pointer items-start justify-center rounded-lg bg-gradient-to-r from-gray-200 to-gray-400`}
                    >
                      {isChangeIcon && item.message.medias?.file_id === messagesFileId ? (
                        <Index progress={downloadProgress!} />
                      ) : (
                        <Image
                          onClick={() => {
                            setMessagesFileId(item.message.medias?.file_id);
                            handleDownloadMessage(item);
                            setImageFormat(item.message.medias?.format);
                          }}
                          src="/svg/homePage/download-iconn.svg"
                          alt="Download Icon"
                          width={25}
                          height={25}
                          className="max-h-60 max-w-xs rounded-xl border border-gray-200 object-cover shadow-md"
                        />
                      )}
                    </div>
                  )
                ) : // message type File-------------------------------------------------------------------------------------------------------------------------
                MessagesType('files', item?.message) ? (
                  <div className="flex w-[240px] items-center gap-2 rounded-lg bg-white p-2 shadow-sm md:gap-4">
                    <div className="flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-[10px] border bg-gradient-to-tr from-MainBgThree to-[#64c457]">
                      {filesUrl || item.fileUrl ? (
                        <a href={item.fileUrl || (filesUrl as string)} download="file">
                          <Image src={'/svg/homePage/file-icon.svg'} alt="" width={20} height={20} />
                        </a>
                      ) : (
                        <Image
                          onClick={() => {
                            setMessagesFileId(item.message.files?.file_id);
                            handleDownloadMessage(item);
                            setImageFormat(item.message.files?.format);
                          }}
                          src="/svg/homePage/download-iconn.svg"
                          alt=""
                          width={20}
                          height={20}
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-xs">{item.message.files?.file_name}</p>
                      <p className="text-xs">{item.message.files?.file_id === messagesFileId && (fileSize || fileDownloadedSize)}KB</p>
                    </div>
                  </div>
                ) : // message type Video-------------------------------------------------------------------------------------------------------------------------
                MessagesType('video', item.message) ? (
                  <div
                    className={`relative flex h-[200px] w-[300px] items-center justify-center rounded ${!MediasUrl && !item?.fileUrl && 'bg-gradient-to-r from-gray-200 to-gray-400'}`}
                  >
                    {MediasUrl || item.fileUrl ? (
                      <video src={`${MediasUrl || item.fileUrl}`} controls className="h-full w-full" />
                    ) : isChangeIcon && item.message.medias?.file_id === messagesFileId ? (
                      <Index progress={downloadProgress!} />
                    ) : (
                      <Image
                        onClick={() => {
                          setMessagesFileId(item.message.medias?.file_id);
                          handleDownloadMessage(item);
                          setImageFormat(item.message.medias?.format);
                        }}
                        src="/svg/homePage/download-iconn.svg"
                        alt="Download Icon"
                        width={25}
                        height={25}
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                ) : null}

                <span
                  ref={(el) => {
                    if (refs[index]) refs[index].current = el;
                  }}
                  className={`absolute h-fit w-[15dvh] ${!isSender ? 'left-1/4' : 'right-1/4'} ${data[0].message_id === item.message_id ? 'top-0' : 'bottom-0'} z-[999999999] rounded-[10px] bg-[#fafafa] p-[.2rem] opacity-0 shadow-sm transition-all duration-200 ${visibleIndex === index ? 'visible scale-100 opacity-100' : 'invisible scale-90 opacity-0'}`}
                >
                  <div className="rtl-custome flex w-full cursor-pointer items-center justify-between p-2 text-gray-800 transition-all duration-200 hover:rounded hover:bg-[#70757914]">
                    <p>{t('copy')}</p>
                    <Image src="/images/homePage/copy-icon.svg" alt="" width={20} height={20} />
                  </div>
                  <div
                    onClick={() => {
                      dispatch(getEditMessage({ message_id: item.message_id, sid: item.sid, sender_id: item.sender_id, message: item.message }));
                      setOpenEditSec(true);
                    }}
                    className="rtl-custome flex w-full cursor-pointer items-center justify-between p-2 text-gray-800 transition-all duration-200 hover:rounded hover:bg-[#70757914]"
                  >
                    <p>{t('edit')}</p>
                    <Image src="/images/homePage/edit-icon.svg" alt="" width={20} height={20} />
                  </div>
                  <div
                    onClick={() => {
                      setOpenForwardMessageDialog(true);
                    }}
                    className="rtl-custome flex w-full cursor-pointer items-center justify-between p-2 text-gray-800 transition-all duration-200 hover:rounded hover:bg-[#70757914]"
                  >
                    <p>Forwad</p>
                    <Image src="/images/homePage/edit-icon.svg" alt="" width={20} height={20} />
                  </div>

                  <div
                    onClick={() => {
                      setDeleteMessageProps({
                        message_id: item.message_id!,
                        sid: item.sid!,
                        sender_id: item.sender_id!,
                        file_id: item.message.medias?.file_id || item.message.files?.file_id || item.message.audios?.file_id,
                      });
                      setOpenDeleteMessageDialog(true);
                    }}
                    className="rtl-custome flex w-full cursor-pointer items-center justify-between p-2 text-red-600 transition-all duration-200 hover:rounded hover:bg-[#ff1b1b28]"
                  >
                    <p>{t('delete')}</p>
                    <Image src="/images/homePage/delete-icon.svg" alt="" width={20} height={20} />
                  </div>
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <DeleteDialog
        open={openDeleteMessageDialog}
        setOpen={setOpenDeleteMessageDialog}
        text={t('delete_message_text')}
        btnText={t('delete')}
        btnStyle={'bg-red-500 hover:bg-red-700 focus:bg-red-700 active:bg-red-700'}
        handleFunc={handleDeleteMessage}
        titleText={t('deleteMessageTitle')}
        hasTitle={true}
      />
      <ForwadMessage open={openForwardMessageDialog ?? false} setOpen={setOpenForwardMessageDialog} socket={socket} />
      <ImageDialog imageUrl={imageDialogUrl!} open={openImageMessageDialog} setOpen={setOpenImageMessageDialog} />
    </section>
  );
}

export default ChatBody;

