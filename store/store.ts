'use client';
import { configureStore } from '@reduxjs/toolkit';
import HomePageComponentsSlice from './slices/HomePageComponentsSlice';
import HambergerMenuSlice from './slices/HambergerMenuSlice';
import LoginFormSilce from '@/store/slices/LoginFormSlice';
import DialogSlice from '@/store/slices/DialogSlice';
import CallDialogSlice from '@/store/slices/CallDialogSlice';
import ProfileDialog from '@/store/slices/ProfileDialog';
import ImageDocDialog from '@/store/slices/ImageDocDIalog';
import ChatFileDialog from '@/store/slices/ChatFileDialog';
import AddStoryDialog from '@/store/slices/AddStorySlice';
import chatReducer from './slices/ChatSlice';
import ChangeSlice from '@/store/slices/ChangeSilde';
import AccountInformation from '@/store/slices/AccountInformationSlice';
import backToChatListReducer from '@/store/slices/BackToChatList';
import groupsReducer from '@/store/slices/GroupSlice';

const store = configureStore({
  reducer: {
    pageStatus: HomePageComponentsSlice,
    hambergerMenu: HambergerMenuSlice,
    userInformation: LoginFormSilce,
    openDialog: DialogSlice,
    CallDialogSlice: CallDialogSlice,
    ProfileDialog: ProfileDialog,
    ImageDocDialog: ImageDocDialog,
    ChatFileDialog: ChatFileDialog,
    AddStoryDialog: AddStoryDialog,
    chat: chatReducer,
    Change: ChangeSlice,
    accountInfo: AccountInformation,
    backToChatList: backToChatListReducer,
    groups: groupsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;