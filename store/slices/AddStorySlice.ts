import { createSlice } from '@reduxjs/toolkit';

// اسلایس برای dialog استوری
const AddStoryDialogSlice = createSlice({
  name: 'AddStoryDialog',
  initialState: false,
  reducers: {
    setAddStoryDialog: (_, { payload }) => {
      return payload;
    },
  },
});

export const { setAddStoryDialog } = AddStoryDialogSlice.actions;
export default AddStoryDialogSlice.reducer;
