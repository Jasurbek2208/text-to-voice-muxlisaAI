import Cookies from 'js-cookie'
import { Dispatch } from 'react'
import { myAxios } from '@service/axios'

// Redux store
import { AnyAction } from '@reduxjs/toolkit'
import { changeLoading, userAuth } from '@store/store'

export async function checkTokenValidity(dispatch: Dispatch<AnyAction>) {
  try {
    const response = await myAxios.get('/auth/userme')
    dispatch(
      userAuth({
        data: { ...response?.data, access_token: Cookies.get('$T$O$K$E$N$') || '' },
        type: 'LOGIN',
      }),
    )
  } catch {
    dispatch(userAuth({ data: null, type: 'LOGOUT' }))
    dispatch(changeLoading(false))
  }
}