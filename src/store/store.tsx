import { createSlice } from "@reduxjs/toolkit";
import { ITextToVoiceHistory } from "../types/types";

interface IUser {
  isAuth: boolean;
  userId: string;
  userToken: string;
}

interface IInitialState {
  textToVoiceHistory: ITextToVoiceHistory[];
  voiceToTextHistory: ITextToVoiceHistory[];
  user: IUser;
}

const initialState: IInitialState = {
  textToVoiceHistory: [],
  voiceToTextHistory: [],
  user: {
    isAuth: false,
    userId: "1690287141925",
    userToken: localStorage.getItem("$T$O$K$E$N$") || "",
  },
};

const store = createSlice({
  name: "store",
  initialState,
  reducers: {
    userTokenChange: (state, action) => {
      state.user.userToken = action?.payload;
    },
    userIdChange: (state, action) => {
      state.user.userId = action?.payload;
    },
    userIsAuthChange: (state, action) => {
      state.user.isAuth = action?.payload;
    },
    textToVoiceHistoryAdd: (state, action) => {
      state.textToVoiceHistory = action?.payload;
    },
    textToVoiceHistoryChange: (state, action) => {
      state?.textToVoiceHistory.push(action?.payload);
    },
    clearTextToVoiceHistory: (state, action) => {
      state.textToVoiceHistory = [];
    },
    clearVoiceToTextHistory: (state, action) => {
      state.textToVoiceHistory = [];
    },
  },
});

export const {
  userTokenChange,
  userIdChange,
  userIsAuthChange,
  textToVoiceHistoryAdd,
  textToVoiceHistoryChange,
  clearTextToVoiceHistory,
  clearVoiceToTextHistory,
} = store?.actions;
export default store.reducer;