'use client';

// اضافه کردن کامپوننت ها و پکیج ها
import Cookies from 'js-cookie';
import { changeTheme } from '@/utils/themeHelper';
import { useDispatch, useSelector } from 'react-redux';
import { handleDelete } from '@/store/slices/ChangeSilde';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EventIDs } from '@/Services/EventIDs';
import { BackToChatListContext } from '../context/backToChatListContext';

// اضافه کردن کامپوننت ها و پکیج ها ها به صورت بهبود یافته
// prettier-ignore
const DocComp = React.memo(React.lazy(() => import('../../DocsComp')));
const NewChat = React.memo(React.lazy(() => import('../NewChat/index')));
const Setting = React.memo(React.lazy(() => import('../../settingComp')));
const QrCodeComp = React.memo(React.lazy(() => import('../../QrCodeComp')));
const UserInfoComp = React.memo(React.lazy(() => import('../../UserInfoComp')));
const ChatListComp = React.memo(React.lazy(() => import('../../ChatListComp')));
const ShareLinkComp = React.memo(React.lazy(() => import('../../ShareLinkComp')));
const HambergerMenu = React.memo(React.lazy(() => import('../../HomeComp/HambergerMenu')));
const AddGroupComp = React.memo(React.lazy(() => import('../../../components/Group/AddGroupComp')));
const GroupDetail = React.memo(React.lazy(() => import('../../../components/GroupDetail')));
const GroupSetting = React.memo(React.lazy(() => import('../../../components/Group/GroupSettingComp')));
const EditChannel = React.memo(React.lazy(() => import('../../../components/Channel/EditChannelComp')));
const GroupMemberComp = React.memo(React.lazy(() => import('../../../components/Group/GroupMemberComp')));
const CreateGroupComp = React.memo(React.lazy(() => import('../../../components/Group/CreateGroupComp')));
const EditGroupDetail = React.memo(React.lazy(() => import('../../../components/GroupDetail/EditGroupDetail')));
const AddGroupMember = React.memo(React.lazy(() => import('../../../components/GroupDetail/AddGroupMember')));
const ChannelSetting = React.memo(React.lazy(() => import('../../../components/Channel/ChannelSettingComp')));
const UserAccount = React.memo(React.lazy(() => import('../../UserAccountComp/index')));
const CreatePassword = React.memo(React.lazy(() => import('../../CreatePasswordComp/index')));
const AddNewGroup = React.memo(React.lazy(() => import('../../NewGroupComp/index')));
const Notifications = React.memo(React.lazy(() => import('../../NotificationsPageComp/Index')));
const ChatSetting = React.memo(React.lazy(() => import('../../ChatSettingComp/Index')));
const StorageSetting = React.memo(React.lazy(() => import('../../StorageSettingComp/Index')));
const CallDialog = React.memo(React.lazy(() => import('@/components/Dialogs/CallDialogComp/index')));
const DisableGroupComp = React.memo(React.lazy(() => import('../../../components/Group/GroupSettingComp/disableGroupComp')));
const ChannelAdminSetting = React.memo(React.lazy(() => import('../../../components/Channel/ChannelAdminSettingComp')));

// بخش اضافه کردن تایپ ها
interface SliderSelectorTypes {
  Change: { items: string[]; state: 'delete' | 'prev' | 'next' };
}

const Index = ({ socket }: { socket: WebSocket }) => {
  // اضافه کردن state ها و سایر tools ها
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { items, state } = useSelector((state: SliderSelectorTypes) => state.Change);

  // تابع بررسی spalash page و زبان برنامه برای اولین بار
  useEffect(() => {
    changeTheme(Cookies.get('theme') ? Cookies.get('theme') : 'light');
    // setTimeout(() => {
    //   Cookies.set('splash', 'true');
    // }, 4500);
    if (!Cookies.get('theme') || Cookies.get('theme') === '') {
      Cookies.set('theme', 'light');
    }
    if (typeof window !== 'undefined') {
      if (!localStorage.getItem('lang') || localStorage.getItem('lang') === null) {
        localStorage.setItem('lang', 'fa');
      }
    }
  }, []);

  // تابع بررسی جلو عقب رفتن سایدبار
  const handleTransform = useMemo((): number | undefined => {
    if (state === 'next') {
      return items.length > 1 ? (items.length - 1) * 100 : 0;
    } else if (state === 'prev') {
      return (items.length - 2) * 100;
    }
  }, [state, items.length]);

  // تغییر فونت برنامه بهمزمان با تغییر زبان
  useEffect(() => {
    const html = document.body;
    if (i18n.language === 'fa') {
      html?.classList.add('!font-YekanBakhFaNum');
      html?.classList.remove('!font-[sans-serif]');
    } else {
      html?.classList.add('!font-[sans-serif]');
      html?.classList.remove('!font-YekanBakhFaNum');
    }
  }, [i18n.language]);

  // تابع گرفتن لیست کاربر ها با هربار رفرش یا ورود به صفحه
  useEffect(() => {
    if (socket) socket.send(JSON.stringify({ event: EventIDs.GET_CONTACT }));
  }, [socket]);

  // بخش جابه‌جایی بین اسلایدر های مختلف
  const renderSlideContent = useCallback(
    (status: string, index: number): JSX.Element => {
      switch (status) {
        case 'chatPage':
          return <ChatListComp socket={socket} key={index} />;
        case 'settingPage':
          return <Setting key={index} />;
        case 'qrCodePage':
          return <QrCodeComp key={index} />;
        case 'shareLinkPage':
          return <ShareLinkComp key={index} />;
        case 'userDetail':
          return <UserInfoComp key={index} socket={socket} />;
        case 'docPage':
          return <DocComp key={index} />;
        case 'addGroup':
          return <AddGroupComp key={index} />;
        case 'groupSetting':
          return <GroupSetting key={index} />;
        case 'groupMember':
          return <GroupMemberComp key={index} />;
        case 'disableGroup':
          return <DisableGroupComp key={index} />;
        case 'createGroup':
          return <CreateGroupComp key={index} />;
        case 'channelAdminSetting':
          return <ChannelAdminSetting key={index} />;
        case 'channelSetting':
          return <ChannelSetting key={index} />;
        case 'editChannel':
          return <EditChannel key={index} />;
        case 'newChat':
          return <NewChat key={index} socket={socket} />;
        case 'userAccount':
          return <UserAccount socket={socket} key={index} />;
        case 'createPass':
          return <CreatePassword key={index} />;
        case 'addNewGroup':
          return <AddNewGroup key={index} socket={socket} />;
        case 'notifications':
          return <Notifications key={index} />;
        case 'ChatSetting':
          return <ChatSetting key={index} />;
        case 'StorageSetting':
          return <StorageSetting key={index} />;
        case 'GroupListComp':
          return <ChatListComp socket={socket} key={index} defaultTab={4} />;
        case 'GroupDetail':
          return <GroupDetail key={index} socket={socket} />;
        case 'EditGroupDetail':
          return <EditGroupDetail key={index} socket={socket} />;
        case 'AddGroupMember':
          return <AddGroupMember key={index} socket={socket} />;
        default:
          return <ChatListComp socket={socket} key={index} />;
      }
    },
    [socket]
  );



  return (
    <>
      <div
        className={`absolute z-10 h-[100dvh] w-full  ease-[cubic-bezier(0.25, 0.8, 0.25, 1)] transform overflow-hidden transition-transform duration-700 md:relative md:min-w-[20rem] md:opacity-100 lg:min-w-[26rem]`}
      >
        <div
          onTransitionEnd={() => state === 'prev' && dispatch(handleDelete())}
          className="flex min-h-[100dvh] transition-all duration-[.3s] [&>*]:shrink-0"
          style={{
            transform: `${`translateX(${handleTransform}%)`}`,
          }}
        >
          {items.map((item, index) => renderSlideContent(item, index))}
        </div>
      </div>
      <HambergerMenu />
      <CallDialog />
    </>
  );
};

export default Index;
