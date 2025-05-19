import { createSlice } from "@reduxjs/toolkit";

const ProfileDialog = createSlice({
  name: "ProfileDialogStatus",
  initialState: false,
  reducers: {
    setNewProfile: (state, { payload }) => {
      return payload;
    },
  },
});

export const { setNewProfile } = ProfileDialog.actions;
export default ProfileDialog.reducer;
