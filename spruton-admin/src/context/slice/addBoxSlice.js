import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openAddBox: false,
  sharedQuestId: null,
};

const addBoxSlice = createSlice({
  name: "box",
  initialState,
  reducers: {
    openAddBox: (state) => {
      state.openAddBox = true;
      state.sharedQuestId = null;
    },
    toggleOpenAddBox: (state) => {
      state.openAddBox = !state.openAddBox;
    },
    closeAddBox: (state) => {
      state.openAddBox = false;
    },
    setSharedQuestId: (state, action) => {
      state.sharedQuestId = action.payload;
      state.openAddBox = false;
    },
  },
});

export const { openAddBox, closeAddBox, toggleOpenAddBox, setSharedQuestId } =
  addBoxSlice.actions;

export default addBoxSlice.reducer;
