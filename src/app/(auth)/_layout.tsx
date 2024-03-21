import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@/provider/AuthProvider'



const AuthLayout = () => {

  const { session } = useAuth()

  if (session){ // Basically if it's sign in
    return <Redirect href={"/"} />
  }

  return <Stack />

}

export default AuthLayout