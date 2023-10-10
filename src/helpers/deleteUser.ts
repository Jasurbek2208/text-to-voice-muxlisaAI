import Cookies from 'js-cookie'
import { myAxios } from '@service/axios'

// Types
import { IDeleteUserParams } from '../types'

// Helpers
import { refreshedNavigate } from './index'

export async function deleteUser(params: IDeleteUserParams) {
  try {
    Cookies.get('$T$O$K$E$N$')
      ? await myAxios.delete(`/auth/user/${params?.verifyId}`)
      : await myAxios.delete(`/auth/user/${params?.verifyId}`, {
          headers: { Authorization: params?.userToken },
        })

    localStorage.removeItem('success-registered')
    Cookies.remove('$T$O$K$E$N$')
    refreshedNavigate('/login')
  } catch (error) {
    alert("Texnik xatolik yuzaga keldi. Iltimos, birozdan so'ng qayta urinib ko'ring!")
  }
}