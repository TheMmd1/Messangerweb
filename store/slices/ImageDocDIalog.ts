import { createSlice } from "@reduxjs/toolkit";

const ImageDocDialog = createSlice({
  name: "ImageDocDialogStatus",
  initialState: false,
  reducers: {
    setNewImageDoc: (state, { payload }) => {
      return payload;
    },
  },
});

export const { setNewImageDoc } = ImageDocDialog.actions;
export default ImageDocDialog.reducer;
