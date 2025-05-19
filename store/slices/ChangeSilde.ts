import { createSlice } from "@reduxjs/toolkit";

const ChangeSlice = createSlice({
  name: "LoginForm",
  initialState: {
    state: "next",
    items: ["One"],
  },
  reducers: {
    addSlide({ items }, { payload }) {
      return { state: "next", items: [...items, payload] };
    },
    handleDelete({ items }) {
      const lastItem = items.at(-1);
      return {
        state: "delete",
        items: items.filter((item) => item !== lastItem),
      };
    },
    handleBack(state) {
      return { ...state, state: "prev" };
    },
  },
});

export const { addSlide, handleBack, handleDelete } = ChangeSlice.actions;
export default ChangeSlice.reducer;
