// context/WebSocketContext.tsx
'use client';

import { useDispatch } from 'react-redux';
import { Connection } from '@/Services/Connection';
import { ContactValue } from '@/utils/useUserStatus';
import { saveOrGetUser } from '@/utils/useCreateUuid';
import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import {
  ChatListType,
  directDeleted,
  getAllMessages,
  getNewMessageFromSocket,
  getUsersProfileById,
  messageDeleted,
  Messages,
  Profile,
  setChatList,
  setContactValues,
  setDirectIdBySocket,
  setDirectsBySocket,
  setMessageEditedBySocket,
  setNewMessages,
  setReadStatus,
  setSelfProfileData,
  setUnreadMessages,
  setUserStatus,
  updateLastMessageInChatList,
} from '@/store/slices/AccountInformationSlice';

// تایپ ها
export interface MessageData {
  event: string;
  state: string;
  data: Profile | ContactValue[] | Messages[] | Messages | ChatListType[];
  message?: string;
}

interface WebSocketContextType {
  socket: WebSocket | null;
}

// ایجاد Context
const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const socketRef = useRef<WebSocket | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  // تابع پردازش کاربران
  async function processUsers(users: ContactValue[]) {
    const updatedUsers = await Promise.all(
      users.map(async (user) => {
        const userData = {
          first_name: user.contact_name,
          phone_number: Number(user.contact_value),
        };
        const uuid = await saveOrGetUser(user.contact_id, userData);

        return { ...user, GUID: uuid.user_hash };
      })
    );
    return updatedUsers;
  }

  const handleNotificationData = useCallback(
    async (messageData: MessageData) => {
      switch (messageData.state) {
        case 'self_profile':
          dispatch(setSelfProfileData(messageData.data as Profile));
          break;

        case 'profile':
          return;

        case 'get_contact':
          const data = await processUsers(messageData.data as ContactValue[]);
          dispatch(setContactValues(data));
          break;

        case 'get_chat_list':
          const TypedChatListData = messageData.data as ChatListType[];
          const convertChatListData = TypedChatListData?.map((item) => {
            try {
              return { ...item, message: { ...item.message, message: JSON.parse(item.message?.message as string) } };
            } catch {
              return { ...item };
            }
          });
          dispatch(setChatList(convertChatListData));
          break;

        case 'status':
          dispatch(setUserStatus(messageData.data));
          break;

        case 'unread':
          dispatch(setUnreadMessages(messageData?.data));
          break;

        case 'read_message':
        case 'read_messages':
          dispatch(setNewMessages(messageData.data));
          dispatch(setReadStatus(messageData.data));
          break;

        case 'get_direct_messages_times':
          const TypedData = messageData.data as Messages[];
          const convertData = TypedData.map((item) => {
            try {
              return { ...item, message: JSON.parse(item.message as string) };
            } catch {
              return { ...item };
            }
          });
          dispatch(getAllMessages(convertData));
          break;

        case 'sent_message':
          const TypedSentMessage = messageData.data as Messages;
          const convertSentMessage = { ...TypedSentMessage, message: JSON.parse(TypedSentMessage.message as string) };
          dispatch(setNewMessages(convertSentMessage));
          dispatch(getNewMessageFromSocket(convertSentMessage));
          dispatch(updateLastMessageInChatList(convertSentMessage));
          break;

        case 'new_message':
          const TypedNewMessage = messageData.data as Messages;
          const convertNewMessage = { ...TypedNewMessage, message: JSON.parse(TypedNewMessage.message as string) };
          dispatch(getNewMessageFromSocket(convertNewMessage));
          dispatch(updateLastMessageInChatList(convertNewMessage));
          dispatch(setNewMessages(convertNewMessage));
          break;

        case 'direct':
          dispatch(setDirectIdBySocket(messageData.data));
          break;

        case 'directs':
          dispatch(setDirectsBySocket(messageData.data));
          break;

        case 'profiles':
          dispatch(getUsersProfileById(messageData.data));
          break;

        case 'direct_deleted':
          dispatch(directDeleted(messageData.data));
          break;
        case 'delete_message':
          dispatch(messageDeleted(messageData.data));
          break;
        case 'edit_messsage':
          dispatch(setMessageEditedBySocket(messageData.data));
          break;
      }
    },
    [dispatch]
  );

  const websocketConnection = useCallback(async () => {
    const { data: token } = (await Connection()) || {};
    console.log(token);

    if (!socketRef.current && token) {
      socketRef.current = new WebSocket(process.env.NEXT_PUBLIC_CONNECTION_WEBSOCKET_URL!);

      socketRef.current.onopen = (event) => {
        console.log('WebSocket connection opened:', event);
        try {
          socketRef.current?.send(
            JSON.stringify({
              event: 0,
              data: { token: token },
            })
          );
        } catch (error) {
          console.error('Error sending data:', error);
        }
        setSocket(socketRef.current);
      };

      socketRef.current!.onmessage = ({ data }) => {
        const messageData = JSON.parse(data);
        console.log('messages socket', messageData);

        switch (messageData.event) {
          case 'notification':
            handleNotificationData(messageData);
            break;
          case 'error':
            // if (messageData.message === "you're not member of chat") {
            //   dispatch(resetAllMessages());
            // }
            break;
          default:
            break;
        }
      };

      socketRef.current!.onclose = () => {
        console.log('WebSocket connection closed');
        socketRef.current = null;
        setTimeout(websocketConnection, 3000);
      };
    }
  }, [handleNotificationData]);

  useEffect(() => {
    websocketConnection();

    return () => {
      socketRef.current?.close();
    };
  }, [websocketConnection]);

  return <WebSocketContext.Provider value={{ socket }}>{children}</WebSocketContext.Provider>;
};

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider');
  }
  return context;
};
