import { createSlice } from "@reduxjs/toolkit";

const HomePageComponent = createSlice({
  name: "HomePageCompStatus",
  initialState: "chatPage",
  reducers: {
    setNewHomeComp: (state, { payload }) => {
      return payload;
    },
  },
});

export const { setNewHomeComp } = HomePageComponent.actions;
export default HomePageComponent.reducer;
