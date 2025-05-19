import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

const CallDialogSlice = createSlice({
  name: "CallDialogSlice",
  initialState: initialState,
  reducers: {
    setCallDialog: (_, { payload }) => {
      return payload;
    },
  },
});

export const { setCallDialog } = CallDialogSlice.actions;
export default CallDialogSlice.reducer;
