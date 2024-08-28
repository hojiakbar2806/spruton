import { createSlice } from "@reduxjs/toolkit";

export const openSlice = createSlice({
  name: "open",
  initialState: {
    giftBox: false,
    connectBox: false,
    connectedBox: false,
    emptyBox: false,
    loadBox: false,
    loot: null,
  },
  reducers: {
    openGiftBox: (state) => {
      state.giftBox = true;
      state.loadBox = false;
      state.openAddBox = false;
      state.connectedBox = false;
      state.emptyBox = false;
    },
    openLoadBox(state) {
      state.loadBox = true;
      state.giftBox = false;
      state.connectBox = false;
      state.connectedBox = false;
      state.emptyBox = false;
    },
    openConnectBox: (state) => {
      state.giftBox = false;
      state.loadBox = false;
      state.connectBox = true;
      state.connectedBox = false;
      state.emptyBox = false;
    },
    openConnectedBox: (state) => {
      state.giftBox = false;
      state.loadBox = false;
      state.connectBox = false;
      state.connectedBox = true;
      state.emptyBox = false;
    },
    openEmptyBox: (state) => {
      state.giftBox = false;
      state.loadBox = false;
      state.openAddBox = false;
      state.connectedBox = false;
      state.emptyBox = true;
    },
    closeBox: (state) => {
      state.giftBox = false;
      state.loadBox = false;
      state.connectBox = false;
      state.connectedBox = false;
      state.emptyBox = false;
    },
    loot: (state, action) => {
      state.loot = action.payload;
    },
  },
});

export const {
  openGiftBox,
  openConnectBox,
  openConnectedBox,
  openEmptyBox,
  closeBox,
  openLoadBox,
  loot,
} = openSlice.actions;
export default openSlice.reducer;
