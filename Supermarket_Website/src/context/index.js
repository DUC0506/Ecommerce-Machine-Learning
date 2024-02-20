import React from 'react'
import AuthProvider from './AuthProvider'


export default function ContextProvider({children}) {
  return (


      
  <AuthProvider>

     {children}

  
  </AuthProvider>
  )
  
}
