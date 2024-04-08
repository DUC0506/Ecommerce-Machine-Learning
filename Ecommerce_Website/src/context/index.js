import React from 'react'
import AuthProvider from './AuthProvider'
import NotificationProvider from './NotificationProvider'


export default function ContextProvider({children}) {
  return (


  <NotificationProvider>     
  <AuthProvider>

     {children}

  
  </AuthProvider>
  </NotificationProvider>   
  )
  
}
