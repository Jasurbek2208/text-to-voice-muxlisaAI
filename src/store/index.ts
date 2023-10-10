import { AnyAction, combineReducers, configureStore, Reducer } from '@reduxjs/toolkit'
import { IRootState } from '../types'
import store from '@store/store'
const rootReducer: Reducer<IRootState, AnyAction> = combineReducers({ store })
const reduxStore = configureStore({ reducer: rootReducer })
export default reduxStore