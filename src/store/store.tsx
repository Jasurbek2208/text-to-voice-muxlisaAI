import { createSlice } from "@reduxjs/toolkit";
import { ITextToVoiceHistory } from "src/types/types";

interface IInitialState {
    textToVoiceHistory: ITextToVoiceHistory[]
}

const initialState: IInitialState = {
    textToVoiceHistory: [] 
};

const store = createSlice({
    name: "store",
    initialState,
    reducers: {
        textToVoiceHistoryChange: (state, action) => {
            state.textToVoiceHistory.push(action.payload)
        }
    }
})

export const { textToVoiceHistoryChange } = store.actions;
export default store.reducer;