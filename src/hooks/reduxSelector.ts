import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { IRootState } from '../types'
// Export custom typed useSelector
export const useTypedSelector: TypedUseSelectorHook<IRootState> = useSelector