import { Suspense, useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import Cookies from 'js-cookie'

// Redux store
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '@hooks/reduxSelector'

// Routes
import { authRoutes, routes } from './routesLinks'

// Loader
import Loader from '@components/loader/Loader'

// Helpers
import { checkingAuthURL, checkTokenValidity } from '@helpers/index'
import { toast } from 'react-toastify'

export default function Router() {
  const dispatch = useDispatch()
  const {
    isLoading,
    user: { isAuth },
  } = useTypedSelector((store) => store?.store)

  const [isOnline, setIsOnline] = useState(true)

  async function checking() {
    checkingAuthURL()
    if (!Cookies.get('$T$O$K$E$N$')) return
    await checkTokenValidity(dispatch)
  }

  // Checking device internet connection
  function handleOnline(isFirstCall = false) {
    if (navigator.onLine) {
      if (isOnline && !isFirstCall) {
        toast.success('Qurilma internetga ulandi!', { position: 'top-center' })
      }
      setIsOnline(true)
    } else {
      setIsOnline(false)
      toast.error("Internetingiz o'chiq!", { position: 'top-center' })
    }
  }

  async function routerInit() {
    await checking()
    if (window.location.pathname === '/success-registered') return
  }

  // Device internet connection watcher
  useEffect(() => {
    handleOnline(true)

    window.addEventListener('online', () => handleOnline(false))
    window.addEventListener('offline', () => handleOnline(false))
    return () => {
      window.removeEventListener('online', () => handleOnline(false))
      window.removeEventListener('offline', () => handleOnline(false))
    }
  }, [])

  // Checking user is admin on device internet connected
  useEffect(() => {
    if (!isOnline) return
    checking()
  }, [isOnline])

  useEffect(() => {
    routerInit()
  }, [])

  const currentRoutes = isAuth ? routes : authRoutes
  const routers = useRoutes(currentRoutes)

  return (
    <>
      {isLoading && <Loader />}
      {isAuth && <Suspense>{routers}</Suspense>}
    </>
  )
}