import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BackToChatListState {
  value: boolean | null;
}

const initialState: BackToChatListState = {
  value: false,
};

const backToChatListSlice = createSlice({
  name: 'backToChatList',
  initialState,
  reducers: {
    setBackToChatList(state, action: PayloadAction<boolean | null>) {
      state.value = action.payload;
    },
  },
});

export const { setBackToChatList } = backToChatListSlice.actions;
export default backToChatListSlice.reducer;
