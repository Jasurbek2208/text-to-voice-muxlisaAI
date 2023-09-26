import { createSlice } from "@reduxjs/toolkit";
import { ITextToVoiceHistory } from "../types/types";

interface IUser {
  isAuth: boolean;
  userId: string;
  userToken: string;
  name: string;
  surname: string;
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
    surname: "",
    name: "Guest",
    isAuth: false,
    userId: "",
    userToken: localStorage.getItem("$T$O$K$E$N$") || "",
  },
};

const store = createSlice({
  name: "store",
  initialState,
  reducers: {
    userAuth: (state, action) => {
      switch (action?.payload?.type) {
        case "LOGIN":
          state.user = {
            isAuth: true,
            name: action?.payload?.data?.user?.name,
            surname: action?.payload?.data?.user?.surname,
            userId: action?.payload?.data?.user?._id,
            userToken: action?.payload?.data?.access_token,
          };
          localStorage.setItem("$T$O$K$E$N$", action?.payload?.data?.access_token);
          break;

        default:
          state.user = {
            isAuth: false,
            name: "Guest",
            surname: "",
            userId: "",
            userToken: "",
          };
          localStorage.removeItem("$T$O$K$E$N$");
          break;
      }
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
  userAuth,
  textToVoiceHistoryAdd,
  textToVoiceHistoryChange,
  clearTextToVoiceHistory,
  clearVoiceToTextHistory,
} = store?.actions;
export default store.reducer;