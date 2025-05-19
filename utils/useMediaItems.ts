import { useState, useEffect } from 'react';
import { isAudio, isFile, isImage, isVideo } from '@/utils/publicFunctions';
import { getImageFromCache } from './useCreateCacheStorage';

type MediaType = {
  format?: string;
  file_id?: string;
};

type MessageType = {
  message: {
    medias?: MediaType;
    files?: MediaType;
    audios?: MediaType;
  };
};

type MergeMessagesTypes = {
  fileId: string;
  url: string;
};

const useMediaItems = (user_messages: MessageType[]) => {
  const [imagesItem, setImagesItem] = useState<MergeMessagesTypes[]>([]);
  const [videoItems, setVideosItem] = useState<MergeMessagesTypes[]>([]);
  const [fileItems, setFileItems] = useState<MergeMessagesTypes[]>([]);
  const [audioItems, setAudioItems] = useState<MergeMessagesTypes[]>([]);

  console.log(user_messages);

  useEffect(() => {
    const processMessages = async () => {
      const images: MergeMessagesTypes[] = [];
      const videos: MergeMessagesTypes[] = [];
      const files: MergeMessagesTypes[] = [];
      const audios: MergeMessagesTypes[] = [];

      for (const item of user_messages) {
        if (isImage(item.message.medias!.format!)) {
          // پردازش عکس
          const fileId = item.message.medias!.file_id!;
          const url = await getImageFromCache(fileId, 'medias');
          if (fileId && url) {
            images.push({ fileId, url });
          }
        }

        // پردازش ویدیو
        if (isVideo(item.message.medias!.format!)) {
          const fileId = item.message.medias!.file_id!;
          const url = await getImageFromCache(fileId, 'medias');
          if (fileId && url) {
            videos.push({ fileId, url });
          }
        }

        // پردازش فایل ها
        if (isFile(item.message.files!.format!)) {
          const fileId = item.message.files!.file_id!;
          const url = await getImageFromCache(fileId, 'medias');
          if (fileId && url) {
            files.push({ fileId, url });
          }
        }

        // پردازش موزیک ها
        if (isAudio(item.message.audios!.format!)) {
          const fileId = item.message.audios!.file_id!;
          const url = await getImageFromCache(fileId, 'medias');
          if (fileId && url) {
            audios.push({ fileId, url });
          }
        }
      }

      // آپدیت کردن state ها
      setImagesItem(images);
      setVideosItem(videos);
      setFileItems(files);
      setAudioItems(audios);
    };

    processMessages();
  }, [user_messages]);

  return { imagesItem, videoItems, fileItems, audioItems };
};

export default useMediaItems;
