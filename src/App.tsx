import React from 'react'
import { BrowserRouter } from 'react-router-dom'

// Toast
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Redux Store
import reduxStore from '@store/index'
import { Provider } from 'react-redux'

// Router
import Router from '@router/Router'

export default function App() {
  return (
    <BrowserRouter>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <div className="bg-[rgba(247,247,248,1)] dark:bg-dark min-h-dvh h-full">
        <Provider store={reduxStore}>
          <Router />
          <ToastContainer />
        </Provider>
      </div>
    </BrowserRouter>
  )
}
// rgba(247,247,248,1)