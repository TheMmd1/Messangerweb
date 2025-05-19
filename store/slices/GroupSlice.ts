import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContactValue } from './AccountInformationSlice';

// Group type
interface Group {
  id: string;
  name: string;
  description: string;
  members: ContactValue[];
  image?: string;
}

// Initial state
interface GroupsState {
  groups: Group[];
  selectedGroup: Group | null;
}

const initialState: GroupsState = {
  groups: [],
  selectedGroup: null,
};

// Helper function to avoid adding duplicate members
const addUniqueMembers = (current: ContactValue[], newOnes: ContactValue[]) => {
  const existingIds = new Set(current.map((m) => m.contact_id));
  return [...current, ...newOnes.filter((m) => !existingIds.has(m.contact_id))];
};

// Slice
const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    // Add a new group
    addGroup(state, action: PayloadAction<Group>) {
      state.groups.push(action.payload);
    },

    // Remove a group by ID
    removeGroup(state, action: PayloadAction<string>) {
      state.groups = state.groups.filter((group) => group.id !== action.payload);
    },

    // Select a group
    setSelectedGroup(state, action: PayloadAction<Group>) {
      state.selectedGroup = action.payload;
    },

    // Clear selected group
    clearSelectedGroup(state) {
      state.selectedGroup = null;
    },

    // Update group name and description
    updateSelectedGroupInfo(state, action: PayloadAction<{ name: string; description: string }>) {
      if (!state.selectedGroup) return;

      const { name, description } = action.payload;

      state.selectedGroup.name = name;
      state.selectedGroup.description = description;

      const index = state.groups.findIndex((g) => g.id === state.selectedGroup!.id);
      if (index !== -1) {
        state.groups[index].name = name;
        state.groups[index].description = description;
      }
    },

    // Update group image
    updateSelectedGroupImage(state, action: PayloadAction<{ image: string }>) {
      if (!state.selectedGroup) return;

      const { image } = action.payload;
      state.selectedGroup.image = image;

      const index = state.groups.findIndex((g) => g.id === state.selectedGroup!.id);
      if (index !== -1) {
        state.groups[index].image = image;
      }

      localStorage.setItem('groupImage', image);
    },

    // Remove a member from the selected group
    kickGroupMember(state, action: PayloadAction<{ memberId: string }>) {
      if (!state.selectedGroup) return;

      const { memberId } = action.payload;
      state.selectedGroup.members = state.selectedGroup.members.filter((m) => m.contact_id !== memberId);

      const index = state.groups.findIndex((g) => g.id === state.selectedGroup!.id);
      if (index !== -1) {
        state.groups[index].members = state.groups[index].members.filter((m) => m.contact_id !== memberId);
      }
    },

    // Add members to a group (avoiding duplicates)
    updateGroupMembers(state, action: PayloadAction<{ groupId: string; newMembers: ContactValue[] }>) {
      const { groupId, newMembers } = action.payload;

      const groupIndex = state.groups.findIndex((g) => g.id === groupId);
      if (groupIndex !== -1) {
        const updatedMembers = addUniqueMembers(state.groups[groupIndex].members, newMembers);
        state.groups[groupIndex].members = updatedMembers;
      }

      if (state.selectedGroup?.id === groupId) {
        state.selectedGroup.members = addUniqueMembers(state.selectedGroup.members, newMembers);
      }
    },

    // Leave a group
    leaveGroup(state, action: PayloadAction<{ groupId: string }>) {
      state.selectedGroup = null;
      state.groups = state.groups.filter((g) => g.id !== action.payload.groupId);
    },
  },
});

// Export actions
export const {
  addGroup,
  removeGroup,
  setSelectedGroup,
  clearSelectedGroup,
  updateSelectedGroupInfo,
  updateSelectedGroupImage,
  kickGroupMember,
  updateGroupMembers,
  leaveGroup,
} = groupsSlice.actions;

// Export reducer
export default groupsSlice.reducer;
