import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { ITextToVoiceHistory } from '../types'

interface IUser {
  isAuth: boolean
  userId: string
  userToken: string
  name: string
  surname: string
}

interface IInitialState {
  isLoading: boolean
  AIVoiceGender: 'Male' | 'Female'
  textToVoiceHistory: ITextToVoiceHistory[]
  voiceToTextHistory: ITextToVoiceHistory[]
  user: IUser
}

const initialState: IInitialState = {
  isLoading: true,
  AIVoiceGender:
    (localStorage.getItem('$text$to$voic$AI$voice$gender$') as 'Male' | 'Female') || 'Male',
  textToVoiceHistory: [],
  voiceToTextHistory: [],
  user: {
    surname: '',
    name: 'Guest',
    isAuth: false,
    userId: '',
    userToken: Cookies.get('$T$O$K$E$N$') || ''
  }
}

const store = createSlice({
  name: 'store',
  initialState,
  reducers: {
    changeLoading: (state, action) => {
      state.isLoading = action?.payload
    },
    changeAIVoiceGender: (state, action) => {
      state.AIVoiceGender = action?.payload
    },
    userAuth: (state, action) => {
      switch (action?.payload?.type) {
        case 'LOGIN':
          state.user = {
            isAuth: true,
            name: action?.payload?.data?.user?.name,
            surname: action?.payload?.data?.user?.surname,
            userId: action?.payload?.data?.user?._id,
            userToken: action?.payload?.data?.access_token,
          }
          Cookies.set('$T$O$K$E$N$', action?.payload?.data?.access_token, { expires: 10 })
          break

        case 'LOGOUT':
          state.user = {
            isAuth: false,
            name: 'Guest',
            surname: '',
            userId: '',
            userToken: '',
          }
          Cookies.remove('$T$O$K$E$N$')
          Cookies.remove('$text$to$voice$audios$')
          break
      }
    },
    textToVoiceHistoryAdd: (state, action) => {
      state.textToVoiceHistory = action?.payload
      // state.textToVoiceHistory = [action?.payload[0]];
    },
    textToVoiceHistoryChange: (state, action) => {
      state?.textToVoiceHistory.push(action?.payload)
    },
    clearTextToVoiceHistory: (state, action) => {
      state.textToVoiceHistory = []
    },
    clearVoiceToTextHistory: (state, action) => {
      state.textToVoiceHistory = []
    },
  },
})

export const {
  changeLoading,
  changeAIVoiceGender,
  userAuth,
  textToVoiceHistoryAdd,
  textToVoiceHistoryChange,
  clearTextToVoiceHistory,
  clearVoiceToTextHistory,
} = store?.actions
export default store.reducer