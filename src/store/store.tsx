import { createSlice } from "@reduxjs/toolkit";
import { ITextToVoiceHistory } from "../types/types";

interface IInitialState {
    textToVoiceHistory: ITextToVoiceHistory[],
}

const initialState: IInitialState = {
    textToVoiceHistory: [],
};

const store = createSlice({
    name: "store",
    initialState,
    reducers: {
        textToVoiceHistoryChange: (state, action) => {
            state.textToVoiceHistory.push(action.payload)
        },
        clearTextToVoiceHistory: (state, action) => {
            state.textToVoiceHistory = []
        },
    }
})

export const { textToVoiceHistoryChange, clearTextToVoiceHistory } = store.actions;
export default store.reducer;