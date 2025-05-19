import { createSlice } from "@reduxjs/toolkit";

interface ChatState {
  isChatOpen: boolean;
}

const initialState: ChatState = {
  isChatOpen: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    toggleChat: (state) => {
      state.isChatOpen = !state.isChatOpen;
    },
    openChat: (state) => {
      state.isChatOpen = true;
    },
    closeChat: (state) => {
      state.isChatOpen = false;
    },
  },
});

export const { toggleChat, openChat, closeChat } = chatSlice.actions;
export default chatSlice.reducer;
