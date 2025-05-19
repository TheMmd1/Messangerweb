import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ================================================================================
// انواع و رابط‌های اولیه
export interface Profile {
  avatar: null | string;
  first_name: null | string;
  last_name: null | string;
  username: null | string;
  bio: null | string;
  birth_date: null | string;
  user_id: null | number;
  phone_number?: number | null;
}
export interface MessageFormatTypes {
  audios?: { format: string; file_id: string; file_name: string };
  files?: { format: string; file_id: string; file_name: string };
  medias?: { format: string; file_id: string; file_name: string };
  message?: string;
}
export interface ContactValue {
  contact_id: number | null;
  contact_name: string;
  contact_value: string;
  GUID?: string;
}
export interface ChatInChatListType1 {
  direct_id: number;
  user_id_1: number;
  user_id_2: number;
  secret_direct: boolean;
}
export interface ChatInChatListType2 {
  message_id: string;
  message: MessageFormatTypes;
  stype: string;
  sid: number;
  sender_id: number;
  receiver_id: number;
  send_at: number;
  created_at: number;
}

export interface ChatListType {
  chat: ChatInChatListType1 | null;
  id: number | null;
  message: null | ChatInChatListType2;
  stype: string;
}
export interface UserStatus {
  status: 'online' | 'offline';
  user_id: number | null;
}
export interface Messages {
  fileUrl?: string;
  message_id: string | null;
  message: MessageFormatTypes;
  stype: string | null;
  sid: number | null;
  sender_id: number | null;
  read_at?: number | null;
  receiver_id: number | null;
  send_at: number | null;
  created_at: number | null;
  read?: boolean;
  edit?: boolean;
}
export interface Messages2 {
  message_id: string | null;
  message: string;
  stype: string | null;
  sid: number | null;
  sender_id: number | null;
  read_at?: number | null;
  receiver_id: number | null;
  send_at: number | null;
  created_at: number | null;
  read?: boolean;
  edit?: boolean;
}

export interface SocketDirectsType {
  direct_id: number | null;
  user_id_1: number | null;
  user_id_2: number | null;
  secret_direct: boolean | null;
}

interface ProfilePayload extends Partial<Profile> {}

export interface UnreadMessages {
  message_id: string | null;
  message: string | null;
  stype: string | null;
  sid: number | null;
  sender_id: number | null;
  receiver_id: number | null;
  send_at: number | null;
  created_at: string | null;
}

export interface UserInfoByIndexDb {
  id: string | null;
  uuid: string | null;
}

export interface EditMessageTextType {
  message_id: string;
  sid: number;
  sender_id: number;
  message: MessageFormatTypes;
}

export interface AccountInfoState {
  self_profile: Profile;
  profile: Profile;
  contactInfo: ContactValue[];
  user_profile: Profile;
  chatList: ChatListType[];
  directId: number | null;
  user_status: UserStatus;
  unreadMessages: UnreadMessages[];
  user_messages: Messages[];
  userReadStatus: string;
  socketDirectId: number | null;
  socketDirects: SocketDirectsType[];
  lastMessage: Messages | null;
  receiveMessageId: string | null;
  UserProfileById: Profile[] | [];
  userInfoByIndexDb: UserInfoByIndexDb;
  directDeletedId: number | null;
  newMessage: Messages | null;
  editMessageText: EditMessageTextType | null;
  messageEditedBySocket: EditMessageTextType | null;
}
// ================================================================================
// مقداردهی اولیه وضعیت‌ها
const messages: Messages[] = [];
const initialChatList: ChatListType[] = [];
const userStatus = {
  status: '',
  user_id: null,
};
const initialSelfProfile = {
  avatar: null,
  first_name: null,
  last_name: null,
  username: null,
  bio: null,
  birth_date: null,
  user_id: null,
  phone_number: null,
};

const initialProfile = {
  avatar: null,
  first_name: null,
  last_name: null,
  username: null,
  bio: null,
  birth_date: null,
  user_id: null,
};
const initialUserProfile = {
  avatar: null,
  first_name: null,
  last_name: null,
  username: null,
  bio: null,
  birth_date: null,
  user_id: null,
  phone_number: null,
  email: null,
};

const Directs = {
  direct_id: null,
  user_id_1: null,
  user_id_2: null,
  secret_direct: null,
};
const UserProfileById = {
  avatar: null,
  first_name: null,
  last_name: null,
  username: null,
  bio: null,
  birth_date: null,
  user_id: null,
  phone_number: null,
  email: null,
};

const userInfoByIndexDb = {
  id: null,
  uuid: null,
};

const editMessage = null;
const msgEditedBySocket = null;

const userReadStatus: string = '';
const initialContact: ContactValue[] = [];

const unReadMessages: UnreadMessages[] = [];

// ================================================================================
// قسمت اسلایس ریداکس
const AccountInformation = createSlice({
  name: 'accountInfo',
  initialState: {
    self_profile: initialSelfProfile,
    profile: initialProfile,
    contactInfo: initialContact || [],
    user_profile: initialUserProfile,
    chatList: initialChatList || [],
    directId: null,
    user_status: userStatus,
    unreadMessages: unReadMessages || [],
    user_messages: messages || [],
    userReadStatus: userReadStatus,
    socketDirectId: null,
    socketDirects: Directs || [],
    lastMessage: null,
    receiveMessageId: null,
    UserProfileById: UserProfileById,
    userInfoByIndexDb: userInfoByIndexDb,
    directDeletedId: null,
    newMessage: null,
    editMessageText: editMessage,
    messageEditedBySocket: msgEditedBySocket,
  } as unknown as AccountInfoState,
  reducers: {
    // بروزرسانی اطلاعات پروفایل شخصی
    setSelfProfileData: (state, { payload }: PayloadAction<ProfilePayload>) => {
      state.self_profile = {
        ...state.self_profile,
        ...payload,
      };
    },
    // بروزرسانی اطلاعات پروفایل کاربر
    setProfileData: (state, { payload }: PayloadAction<ProfilePayload>) => {
      state.profile = {
        ...state.profile,
        ...payload,
      };
    },
    // تنظیم مقادیر مخاطبین
    setContactValues: (state, { payload }) => {
      state.contactInfo = payload;
    },
    // تنظیم پروفایل کاربر
    setUserProfile: (state, { payload }) => {
      state.user_profile = payload;
    },
    // بروزرسانی لیست چت‌ها
    setChatList: (state, { payload }) => {
      state.chatList = payload || [];
    },
    addNewChatList: (state, { payload }) => {
      state.chatList = [...state.chatList, payload];
    },
    // تنظیم آیدی مستقیم
    setDirectId: (state, { payload }) => {
      state.directId = payload;
    },
    // تنظیم وضعیت کاربر
    setUserStatus: (state, { payload }) => {
      state.user_status = payload;
    },
    // تنظیم پیام‌های خوانده نشده
    setUnreadMessages: (state, { payload }) => {
      state.userReadStatus = 'unread';
      state.unreadMessages = payload;
    },
    // اضافه کردن پیام‌های جدید
    setNewMessages: (state, { payload }) => {
      state.userReadStatus = 'new_message';
      if (!payload.message) return;
      if (state.socketDirectId === payload?.sid || state.directId === payload?.sid) {
        // تبدیل پیام جدید
        const convertMessage = { ...payload, read: false, read_at: null };
        // استخراج file_id از پیام جدید
        const newFileId = payload.message?.medias?.file_id || payload.message?.files?.file_id || payload.message?.audios?.file_id;
        if (newFileId && payload.sender_id === state.self_profile.user_id) {
          // حذف پیام‌هایی با file_id مشابه
          state.user_messages = state.user_messages.map((msg) => {
            const isMedia = msg.message.medias?.file_id === newFileId;
            const isFile = msg.message.files?.file_id === newFileId;
            const isAudio = msg.message.audios?.file_id === newFileId;
            if (isMedia || isFile || isAudio) {
              return { ...msg, ...payload };
            } else return msg;
          });
          console.log(newFileId && payload.sender_id !== state.self_profile.user_id);
        } else if (newFileId && payload.sender_id !== state.self_profile.user_id) {
          state.user_messages = [...state.user_messages, convertMessage];
        } else {
          state.user_messages = [...state.user_messages, convertMessage];
        }
      }
      // اضافه کردن پیام به پیام‌های خوانده‌نشده
      state.unreadMessages = [...state.unreadMessages, payload];
    },

    updateUserMessage: (state, { payload }) => {
      state.user_messages = [...state.user_messages, payload];
    },
    getNewMessageFromSocket: (state, { payload }) => {
      const convertMessage = { ...payload, read: false, read_at: null };
      state.newMessage = convertMessage;
    },
    // دریافت تمام پیام‌ها
    getAllMessages: (state, { payload }) => {
      const updatedMessages = payload?.map((item: Messages) => {
        if (!item.hasOwnProperty('read_at')) {
          item.read_at = null;
        }
        return item;
      });
      state.user_messages = updatedMessages;
    },
    updateMessageReadStatus: (state, { payload }) => {
      const { message_id, read_at } = payload;

      state.user_messages = state.user_messages.map((message) => (message.message_id === message_id ? { ...message, read: true, read_at } : message));
    },
    // بازنشانی تمام پیام‌ها
    resetAllMessages: (state) => {
      state.user_messages = [];
    },
    // تنظیم وضعیت پیام به خوانده شده
    setReadStatus: (state, { payload }) => {
      state.userReadStatus = 'read';
      payload?.message_ids.forEach((item: string) => (state.receiveMessageId = item));
    },
    // تنظیم آیدی مستقیم با سوکت
    setDirectIdBySocket: (state, { payload }) => {
      console.log(payload);
      state.socketDirectId = payload;
    },
    // تنظیم تعداد مستقیم‌ها با سوکت
    setDirectsBySocket: (state, { payload }) => {
      state.socketDirects = payload;
    },
    // تنظیم آخرین پیام
    setLastMessage: (state, { payload }) => {
      state.lastMessage = payload;
    },
    resetAllUnreadMessages: (state) => {
      state.unreadMessages = [];
    },
    getUsersProfileById: (state, { payload }) => {
      state.UserProfileById = payload;
    },
    getUserInfoByIndexDb: (state, { payload }) => {
      state.userInfoByIndexDb = payload;
    },
    directDeleted: (state, { payload }) => {
      state.chatList = state.chatList.filter((item) => item.id !== payload?.direct_id);
      state.directDeletedId = payload?.direct_id;
    },
    messageDeleted: (state, { payload }) => {
      if (!payload && state.user_messages) return;
      state.user_messages = state.user_messages?.filter((item) => item?.message_id !== payload?.message_id);
    },
    getEditMessage: (state, { payload }) => {
      state.editMessageText = payload;
    },
    setMessageEditedBySocket: (state, { payload }) => {
      state.messageEditedBySocket = payload;
      state.user_messages = state.user_messages?.map((msg) => {
        if (msg.message_id === payload.message_id) {
          return { ...msg, message: { message: payload.message }, edit: true };
        }
        return msg;
      });
    },
    updateLastMessageInChatList: (state, { payload }) => {
      state.chatList = JSON.parse(JSON.stringify(state.chatList))?.map((item: ChatListType) => {
        if (item.id === payload.sid) {
          const updateArr = {
            ...item,
            message: payload,
          };
          return updateArr;
        }
        return item;
      });
    },
  },
});

// ================================================================================
// خروجی تمام اکشن‌ها
export const {
  updateUserMessage,
  setSelfProfileData,
  setProfileData,
  setUserProfile,
  setContactValues,
  setChatList,
  setDirectId,
  setUserStatus,
  setUnreadMessages,
  setNewMessages,
  getAllMessages,
  resetAllMessages,
  setReadStatus,
  setDirectIdBySocket,
  setDirectsBySocket,
  setLastMessage,
  resetAllUnreadMessages,
  getUsersProfileById,
  getUserInfoByIndexDb,
  updateMessageReadStatus,
  directDeleted,
  messageDeleted,
  addNewChatList,
  getNewMessageFromSocket,
  getEditMessage,
  setMessageEditedBySocket,
  updateLastMessageInChatList,
} = AccountInformation.actions;

export default AccountInformation.reducer;
