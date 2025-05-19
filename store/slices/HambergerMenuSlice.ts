import { createSlice } from "@reduxjs/toolkit";

const HambergerMenu = createSlice({
  name: "HambergerMenu",
  initialState: false,
  reducers: {
    setNewHambergerStatus: (state, { payload }) => {
      return payload;
    },
  },
});

export const { setNewHambergerStatus } = HambergerMenu.actions;
export default HambergerMenu.reducer;
