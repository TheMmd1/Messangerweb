import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

const ChatFileDialog = createSlice({
  name: "ChatFileDialog",
  initialState: initialState,
  reducers: {
    setChatFileDialog: (_, { payload }) => {
      return payload;
    },
  },
});

export const { setChatFileDialog } = ChatFileDialog.actions;
export default ChatFileDialog.reducer;
