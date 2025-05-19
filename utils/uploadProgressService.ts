import axios from 'axios';
import { EventIDs } from '@/Services/EventIDs';
import { saveImageToCache } from '@/utils/useCreateCacheStorage';
import { processMessageType } from '@/utils/publicFunctions';
import { DetailType } from '@/components/ChatSection/Index';
import { Dispatch, SetStateAction } from 'react';

type DirectIdByIndexDb =
  | {
      direct_id: number | null;
      user_id_1: number | null;
      user_id_2: number | null;
      secret_direct: boolean | null;
    }
  | undefined;

type UploadProgressProps = {
  uploadFileDetail?: DetailType;
  fileAsBuffer: Buffer | null;
  fileType: string | null;
  file: File | null;
  getDirectIdByIndexDb: DirectIdByIndexDb;
  socketDirectId: number | null;
  socket: WebSocket | null;
  setUploadProgress: Dispatch<SetStateAction<number | undefined>>;
};

export const trackUploadProgress = ({
  uploadFileDetail,
  fileAsBuffer,
  fileType,
  file,
  getDirectIdByIndexDb,
  socketDirectId,
  socket,
  setUploadProgress,
}: UploadProgressProps) => {
  if (!uploadFileDetail?.ticketId) return;

  const interval = setInterval(async () => {
    try {
      const { data } = await axios.get(`/api/upload?ticketId=${uploadFileDetail.ticketId}`);
      if (data.progress === undefined) {
        console.log('Failed to fetch progress.');
        return;
      }

      setUploadProgress(data.progress);
      if (data.progress < 100) return;

      clearInterval(interval);
      saveImageToCache(uploadFileDetail.fileId, fileAsBuffer!, fileType!, 'medias');

      const messageData = {
        direct_id: getDirectIdByIndexDb?.direct_id || socketDirectId,
        message: JSON.stringify(processMessageType(file?.type.split('/')[1].toLowerCase(), uploadFileDetail.fileId, file?.name)),
        receiver_id: getDirectIdByIndexDb?.user_id_1 || getDirectIdByIndexDb?.user_id_2,
      };

      socket?.send(JSON.stringify({ event: EventIDs.SEND_MESSAGE, data: messageData }));
    } catch (error) {
      clearInterval(interval);
    }
  }, 1500);

  return () => clearInterval(interval);
};
