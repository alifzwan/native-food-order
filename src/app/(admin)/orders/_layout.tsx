import React from 'react'
import { Stack } from 'expo-router'

const TabIndex = () => {

  return (
    <Stack>
      <Stack.Screen name='list' options={{ headerShown: false }}/>
    </Stack>
  )

}

export default TabIndex