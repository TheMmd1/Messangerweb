import { createSlice } from "@reduxjs/toolkit";

const DialogSlice = createSlice({
  name: "DialogSlice",
  initialState: false,
  reducers: {
    setOpenDialog: (_, { payload }) => {
      return payload;
    },
  },
});

export const { setOpenDialog } = DialogSlice.actions;
export default DialogSlice.reducer;
