import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { updateGroupMembers } from '@/store/slices/GroupSlice';
import { addSlide } from '@/store/slices/ChangeSilde';
import Image from 'next/image';
import i18n from '@/i18n';
import LastSeen from '@/components/LastSeenCompo/Index';
import { ContactValue } from '@/utils/useUserStatus';

const AddMembersToGroup = ({ socket }: { socket: WebSocket }) => {
  const { t } = i18n;
  const dispatch = useDispatch();

  const selectedGroup = useSelector((state: RootState) => state.groups.selectedGroup);
  const contactInfo = useSelector((state: RootState) => state.accountInfo.contactInfo);

  const [query, setQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState<ContactValue[]>([]);
  const [selectedNewMembers, setSelectedNewMembers] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedGroup) return;

    const groupMemberIds = selectedGroup.members.map((m) => m.contact_id);
    const lowerQuery = query.toLowerCase();

    const filtered = contactInfo.filter((contact) => {
      const name = contact.contact_name?.toLowerCase() || '';
      const notInGroup = !groupMemberIds.includes(contact.contact_id);
      const matchesQuery = name.includes(lowerQuery);

      return notInGroup && (!query || matchesQuery);
    });

    setFilteredContacts(filtered);
  }, [query, contactInfo, selectedGroup]);

  const toggleContact = (id: string) => {
    if (selectedNewMembers.includes(id)) {
      setSelectedNewMembers(selectedNewMembers.filter((i) => i !== id));
    } else {
      setSelectedNewMembers([...selectedNewMembers, id]);
    }
  };

  const handleAddMembers = () => {
    if (!selectedGroup) return;

    const contactsToAdd = contactInfo.filter((contact) => selectedNewMembers.includes(contact.contact_id));

    dispatch(
      updateGroupMembers({
        groupId: selectedGroup.id,
        newMembers: contactsToAdd,
      })
    );

    dispatch(addSlide('EditGroupDetail'));
  };

  if (!selectedGroup) return null;

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-start justify-start">
      <header className="flex h-[8dvh] w-full items-center justify-between">
        <h3 className="font-IranYekanMedium m-auto pr-6 text-center text-2xl text-[1.8dvh] text-MainTextTwo text-white">{t('addMember')}</h3>
        <div
          onClick={() => dispatch(addSlide('EditGroupDetail'))}
          className={`flex w-[35px] items-center ${t('system_lang') === 'en' ? 'rotateYMenu justify-end' : 'justify-start'}`}
        >
          <Image
            width={35}
            height={30}
            className="h-[2.5dvh] w-[2.5dvh] cursor-pointer object-contain pl-1"
            src="/svg/Setting/arrowLeft.svg"
            alt="back arrow"
          />
        </div>
      </header>

      <div className="rtl-custome your-component-scrollbar flex h-[calc(100dvh-8dvh)] w-full flex-col items-center justify-start rounded-t-[30px] bg-MainBgOne">
        <div className="flex w-full flex-col px-4 pt-6">
          <h3 className="font-IranYekanBold text-[2dvh] text-MainTextOne text-black">{t('contacts')}</h3>
          <div className="relative flex h-[9dvh] w-full items-center md:h-[10dvh]">
            <div
              onClick={() => {}}
              className="border-1 absolute right-1 z-50 mr-1 flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full border-blue-gray-400 bg-MainBgThree p-1 text-gray-400 md:h-[45px] md:w-[45px]"
            >
              <Image
                width={35}
                height={35}
                className="z-50 h-[20px] w-[20px] object-contain md:h-[2dvh] md:w-[2dvh]"
                src="/svg/homePage/searchIcon.svg"
                alt="search icon"
              />
            </div>
            <input
              dir="rtl"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search')}
              type="text"
              className="absolute z-0 h-[20px] w-full rounded-[30px] border-2 border-[#A0BEB0] py-6 pl-5 pr-14 text-[13px] outline-none transition-all duration-300 placeholder:text-xs placeholder:text-[#A0BEB0] sm:text-[1rem] md:py-7 md:pr-16"
            />
          </div>
        </div>

        <div className="max-h-[75%] w-full space-y-3 overflow-y-auto px-2">
          {filteredContacts.length === 0 && query ? (
            <p className="mt-6 text-center text-[1.7dvh] text-gray-500">{t('no_results_found')}</p>
          ) : (
            filteredContacts.map((contact) => (
              <label
                key={contact.contact_id}
                className="mt-2 flex w-full items-center justify-between gap-3 rounded-[20px] border-2 border-gray-300 px-2 py-2"
              >
                <div className="flex items-center gap-3">
                  <Image
                    width={65}
                    height={65}
                    className="h-[5dvh] w-[5dvh] rounded-full border border-[#F6F6F6] object-cover object-top"
                    src={'/svg/default_profile/user-profile.svg'}
                    alt="icon image"
                  />
                  <div className="flex flex-col gap-2">
                    <span className="text-black">{contact.contact_name}</span>
                    <p className="text-[1.3dvh] text-MainTextTwo">
                      <LastSeen socket={socket} userId={contact.contact_id} />
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedNewMembers.includes(contact.contact_id)}
                  onChange={() => toggleContact(contact.contact_id)}
                  className="form-checkbox h-5 w-5 text-green-600"
                />
              </label>
            ))
          )}
        </div>

        <div className="absolute bottom-12 mt-4 flex w-full justify-start px-4">
          <button
            onClick={handleAddMembers}
            className="rounded-[10px] bg-MainBgThree px-8 py-4 text-[18px] text-MainBgOne shadow-[0_1px_5px_#00000024]"
          >
            {t('save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMembersToGroup;
