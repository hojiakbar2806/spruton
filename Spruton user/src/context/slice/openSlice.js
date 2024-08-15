import { createSlice } from "@reduxjs/toolkit";

export const openSlice = createSlice({
  name: "open",
  initialState: {
    giftBox: false,
    connectBox: false,
    connectedBox: false,
    embtBox: false,
  },
  reducers: {
    openGiftBox: (state) => {
      state.giftBox = true;
      state.openAddBox = false;
      state.connectedBox = false;
      state.embtBox = false;
    },
    openConnectBox: (state) => {
      state.giftBox = false;
      state.connectBox = true;
      state.connectedBox = false;
      state.embtBox = false;
    },
    openConnectedBox: (state) => {
      state.giftBox = false;
      state.connectBox = false;
      state.connectedBox = true;
      state.embtBox = false;
    },
    openEmbtBox: (state) => {
      state.giftBox = false;
      state.openAddBox = false;
      state.connectedBox = false;
      state.embtBox = true;
    },
    closeBox: (state) => {
      state.giftBox = false;
      state.connectBox = false;
      state.connectedBox = false;
      state.embtBox = false;
    },
  },
});

export const {
  openGiftBox,
  openConnectBox,
  openConnectedBox,
  openEmbtBox,
  closeBox,
} = openSlice.actions;
export default openSlice.reducer;
